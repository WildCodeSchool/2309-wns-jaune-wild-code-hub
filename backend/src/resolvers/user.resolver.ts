import { Arg, Float, Mutation, Query, Resolver } from "type-graphql";
import UsersService from "../services/users.service";
import {
  User,
} from "../entities/user.entity";

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async listUsers() {
    const users = await new UsersService().listUsers();
    return users;
  }
}