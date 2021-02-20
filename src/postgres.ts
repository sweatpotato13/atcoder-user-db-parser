import { config } from "./config";
const { Client } = require("pg");

export const client = new Client({
    host: config.postgres_ip,
    port: config.postgres_port,
    user: "postgres",
    password: config.postgres_password,
    database: config.postgres_db,
});

client.connect(err => {
    if (err) {
        console.error("connection error", err.stack);
    } else {
        console.log("connected");
    }
});
