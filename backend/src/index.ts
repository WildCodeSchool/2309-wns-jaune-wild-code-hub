import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import "dotenv/config";

import { buildSchema } from "type-graphql";
import db from "./lib/db";
import migrate from "./migrate";
import { UserResolver } from "./resolvers/user.resolver";

import express from "express";
import http from "http";
import cors from "cors";
import "reflect-metadata";
import Cookies from "cookies";
import { User } from "./entities/user.entity";
import { jwtVerify } from "jose";
import UserService from "./services/users.service";
import { customAuthChecker } from "./lib/authChecker";
import { ProjectResolver } from "./resolvers/project.resolver";

export interface MyContext {
  req: express.Request;
  res: express.Response;
  user: User | null;
}
export interface Payload {
  email: string;
}

const app = express();
const httpServer = http.createServer(app);

async function main() {
  const schema = await buildSchema({
    resolvers: [UserResolver, ProjectResolver],
    validate: false,
    authChecker: customAuthChecker, 
  });
  const server = new ApolloServer<MyContext>({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  app.use(
    "/",
    cors<cors.CorsRequest>({
      origin: ["http://localhost:3000", "https://studio.apollographql.com"],
      credentials: true,
    }),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        let user: User | null = null;

        const cookies = new Cookies(req, res);
        const token = cookies.get("token");
        if (token) {
          try {
            const verify = await jwtVerify<Payload>(
              token,
              new TextEncoder().encode(process.env.SECRET_KEY)
            );
            user = await new UserService().findByEmail(
              verify.payload.email
            );
          } catch (err) {
            console.log(err);
          }
        }
        return { req, res, user };
      },
    })
  );
  await db.initialize();
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server lancé sur http://localhost:4000/`);
}

main();
