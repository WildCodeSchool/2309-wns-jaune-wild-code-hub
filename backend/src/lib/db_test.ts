import { DataSource } from "typeorm";

export default new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5435,
  username: "root",
  password: "root",
  database: "wildcodehub-test",
  synchronize: true,
  // logging: ["query", "error"],
  logging: false,
  entities: ["src/entities/*.ts"],
});
