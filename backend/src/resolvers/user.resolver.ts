import { Arg, Float, Mutation, Query, Resolver } from "type-graphql";
import UsersService from "../services/users.service";
import { User, CreateUserInput, UpdateUserInput } from "../entities/user.entity";

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async listUsers() {
    const users = await new UsersService().list();
    return users;
  }

  @Query(() => User)
  async findUserById(@Arg("id") id: string) {
    if (isNaN(+id)) {
      throw new Error("Indiquez un id correct");
    }
    const userById = await new UsersService().find(+id);
    if (!userById) {
      throw new Error("Attention, le client n'existe pas");
    }
    return userById;
  }

  @Mutation(() => User)
  async createUser(@Arg("data") data: CreateUserInput) {
    const newUser = await new UsersService().create(data);
    return newUser;
  }

  @Mutation(() => User)
  async updateUser(@Arg("data") data: UpdateUserInput) {
    const { id, ...otherData } = data;
    const updateUser = await new UsersService().update(+id, otherData);
    return updateUser;
  }
}
