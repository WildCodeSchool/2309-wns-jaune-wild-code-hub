import { DataSource } from "typeorm";

export default new DataSource({
  type: "postgres",
  host: "db",
  port: 5432,
  username: "root",
  password: "root",
  database: "wildcodehub-test",
  synchronize: true,
  logging: ["query", "error"],
  entities: ["src/entities/*.ts"],
});
