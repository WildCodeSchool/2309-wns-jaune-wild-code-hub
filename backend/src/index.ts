// import "reflect-metdata";
import 'dotenv/config'
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import db from "./db";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/user.resolver";


async function main() {
    console.log("toto")
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
    
      await db.initialize();
    
      console.log(`🚀  Server ready at: ${url}`);
}

main()