import { buildSchemaSync } from "type-graphql";
import { UserResolver } from "../src/resolvers/user.resolver";
import { ApolloServer } from "@apollo/server";
import datasource from "../src/lib/db"; //on importe la datasource de test
import datasourceInitial from "../src/datasource"; //on importe la datasource initial pour le spyOn
import { User } from "../src/entities/user.entity";

let server: ApolloServer;

const baseSchema = buildSchemaSync({
  resolvers: [UserResolver],
  authChecker: () => true,
});

beforeAll(async () => {
  server = new ApolloServer({
    schema: baseSchema,
  });

  jest
    .spyOn(datasourceInitial, "getRepository")
    .mockReturnValue(datasource.getRepository(User));

  await datasource.initialize(); //initialisation de la datasource
  await datasource.getRepository(User).clear(); //vidage de la table et non drop de la base de donnée complète
});

afterAll(async () => {
  await datasource.dropDatabase(); //suppression de la base de donnée
});

describe("Test for a new user", () => {
  it("recuperation des users", () => {
    console.log("first test");
  });
});
