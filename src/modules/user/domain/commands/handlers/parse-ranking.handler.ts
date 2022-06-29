import { ICommandHandler, CommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "@src/common/entities";
import { IUserRepository } from "@src/shared/interfaces/repository/user-repository.interface";
import { ParseRankingCommand } from "../impl/parse-ranking.command";
import scraper from "table-scraper";
import { LoggerService } from "@src/shared/services";
import { IUser } from "@src/common/entities/interfaces/user.interface";

@CommandHandler(ParseRankingCommand)
export class ParseRankingHandler implements ICommandHandler<ParseRankingCommand> {
    constructor(
        @InjectRepository(User)
        private readonly _userRepo: IUserRepository,
        private readonly loggerService: LoggerService
    ) { }

    async execute(command: ParseRankingCommand): Promise<any> {
        let pageid = 1;
        try {
            while (pageid) {
                const data = await scraper.get(
                    `https://beta.atcoder.jp/ranking?page=${pageid}`
                );
                const table = data[1];
                if (table == undefined) {
                    break;
                }
                table.forEach(async element => {
                    let user: string = element.User;
                    if (user.indexOf("\n") != -1) {
                        user = user.substring(0, user.indexOf("\n"));
                        element.User = user;
                    }
                    if (element.Birth == "") element.Birth = 0;
                    else {
                        element.Birth = parseInt(element.Birth);
                    }
                    const data: IUser = {
                        rank: parseInt(element.Rank),
                        user: user,
                        bitrh: element.Birth == "" ? 0 : parseInt(element.Birth),
                        rating: parseInt(element.Rating),
                        highest: parseInt(element.Highest),
                        match: parseInt(element.Match),
                        win: parseInt(element.Win),
                    }
                    const isExist = await this._userRepo.findUserById(data.user);
                    if (isExist) {
                        this._userRepo.removeUser(isExist);
                    }
                    this._userRepo.createUser(data);
                });
                pageid += 1;
            }
            this.loggerService.info(`Finish to parsing page`);
        } catch (error: any) {
            this.loggerService.error(error.message);
        }
    }
}
