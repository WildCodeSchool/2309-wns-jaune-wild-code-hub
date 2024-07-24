import { DataSource } from "typeorm";

export default new DataSource({
    type: "postgres",
    host : process.env.HOST_DB,
    port: process.env.PORT_DB ? Number(process.env.PORT_DB) : 5432,
    username : process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize : true,
    // logging: ["query", "error"],
    logging: false,
    entities : ['src/entities/*.ts']  
});