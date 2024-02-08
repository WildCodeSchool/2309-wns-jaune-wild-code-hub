import { DataSource } from "typeorm";

export default new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5434,
  username: "root",
  password: "root",
  database: "wildcodehub-test",
  synchronize: true,
  logging: ["query", "error"],
  entities: ["src/entities/*.ts"],
});
