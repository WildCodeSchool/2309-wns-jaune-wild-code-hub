import { Arg, Float, Mutation, Query, Resolver } from "type-graphql";
import UsersService from "../services/users.service";
import { User, CreateUserInput, UpdateUserInput, ROLE } from "../entities/user.entity";
import * as argon2 from "argon2";

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async listUsers() {
    const users = await new UsersService().list();
    return users;
  }

  @Query(() => [User])
  async listUsersByRole(@Arg("role") role: ROLE) {
    const users = await new UsersService().listByRole(role);
    return users;
  }

  @Query(() => User)
  async findUserById(@Arg("id") id: string) {
    if (isNaN(+id)) throw new Error("Specify a correct id");
    const userById = await new UsersService().findById(+id);
    if (!userById) throw new Error("Please note, the client does not exist");
    return userById;
  }

  @Query(() => User)
  async findUserByEmail(@Arg("email") email: string) {
    const userByEmail = await new UsersService().findByEmail(email);
    if (!userByEmail) throw new Error("Please note, the client does not exist");
    return userByEmail;
  }

  @Query(() => User)
  async findUserByPseudo(@Arg("pseudo") pseudo: string) {
    const userByPseudo = await new UsersService().findByPseudo(pseudo);
    if (!userByPseudo) throw new Error("Please note, the client does not exist");
    return userByPseudo;
  }

  @Mutation(() => User)
  async register(@Arg("data") data: CreateUserInput) {
    const user = await new UsersService().findByEmail(data.email);
    if (user) {
      throw new Error("This email is already in use!");
    }
    const newUser = await new UsersService().create(data);
    return newUser;
  }

  @Mutation(() => User)
  async updateUser(@Arg("data") data: UpdateUserInput) {
    const { id, ...otherData } = data;
    if (otherData.password) {
      otherData.password = await argon2.hash(otherData.password);
    }
    const updateUser = await new UsersService().update(+id, otherData);
    return updateUser;
  }

  @Mutation(() => User)
  async deleteUser(@Arg("id") id: number) {
    const delUser = await new UsersService().delete(id);
    return delUser;
  }
}
