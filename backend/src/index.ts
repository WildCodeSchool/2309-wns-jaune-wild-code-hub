import 'dotenv/config';
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { createConnection } from "typeorm";

import db from "./db";  // Assure-toi que le chemin est correct
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/user.resolver";
import { User } from "./entities/user.entity";
import migrate from "./migrate"
async function main() {

  await db.initialize();

  const isMigrate = false;
  
  if(isMigrate) {
    migrate(db)
  }

  const schema = await buildSchema({
    resolvers: [UserResolver],
  });

  const server = new ApolloServer<{}>({
    schema,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }) => {
      return {};
    },
  });

  // await db.initialize();

  console.log(`🚀  Server ready at: ${url}`);
}

main();