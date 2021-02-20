/* eslint-disable @typescript-eslint/no-empty-function */
import { config as _config } from "dotenv";
_config({ path: __dirname + "/../../.env" });

export const config = {
    // PostgreSQL
    postgres_host: process.env.POSTGRES_HOST || "ship-postgres",
    postgres_port: parseInt(process.env.POSTGRES_PORT) || 5432,
    postgres_password: process.env.POSTGRES_PASSWORD || "postgres",
    postgres_db: process.env.POSTGRES_DB || "postgres",
    postgres_volume: process.env.POSTGRES_VOLUME || "pgdata",
    postgres_table: process.env.POSTGRES_TABLE || "public.userinfo",
    postgres_ip: process.env.POSTGRES_IP || "127.0.0.1",
    // PgAdmin
    pgadmin_port: parseInt(process.env.PGADMIN_PORT) || 5050,
    pgadmin_default_email:
        process.env.PGADMIN_DEFAULT_EMAIL || "admin@pgadmin.com",
    pgadmin_default_password: process.env.PGADMIN_DEFAULT_PASSWORD || "admin",
    // Hasura
    hasura_port: parseInt(process.env.HASURA_PORT) || 8080,
    hasura_admin_secret: process.env.HASURA_ADMIN_SECRET || "myadminsecretkey",
};
