import { DataSource } from "typeorm";

export default new DataSource({
    type: "postgres",
    host : process.env.HOST_DB,
    port : 5432,
    username : process.env.USERNAME_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DATABASE_DB,
    synchronize : true,
    logging: ["query", "error"],
    entities : ['src/entities/*.ts']  
});
