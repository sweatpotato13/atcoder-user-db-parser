import { config } from "./config";
import { client } from "./postgres";
import cron from "node-cron";
import scraper from "table-scraper";

cron.schedule("0 0 * * *", async function () {
    let pageid = 1;
    while (pageid) {
        const data = await scraper.get(
            `https://beta.atcoder.jp/ranking?page=${pageid}`
        );
        const table = data[1];
        if (table == undefined) {
            break;
        }
        console.log(pageid);
        table.forEach(async element => {
            let user: string = element.User;
            if (user.indexOf("\n") != -1) {
                user = user.substring(0, user.indexOf("\n"));
                element.User = user;
            }
            element.Rank = parseInt(element.Rank);
            if (element.Birth == "") element.Birth = 0;
            else {
                element.Birth = parseInt(element.Birth);
            }
            element.Rating = parseInt(element.Rating);
            element.Highest = parseInt(element.Highest);
            element.Match = parseInt(element.Match);
            element.Win = parseInt(element.Win);
            const deleteQuery = `DELETE FROM ${config.postgres_table} WHERE userinfo.user = '${element.User}';`;
            const insertQuery = `INSERT INTO ${config.postgres_table} VALUES (${element.Rank},'${element.User}',${element.Birth},${element.Rating},${element.Highest},${element.Match},${element.Win});`;
            await client.query(deleteQuery);
            await client.query(insertQuery);
        });
        pageid += 1;
    }
});
