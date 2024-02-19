import { Arg, Float, Mutation, Query, Resolver } from "type-graphql";
import UsersService from "../services/users.service";
import { User, CreateUserInput, UpdateUserInput, ROLE } from "../entities/user.entity";

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async listUsers() {
    const users = await new UsersService().list();
    return users;
  }

  @Query(() => [User])
  async listUsersByRole(@Arg("role") role: ROLE) {
    if (!role || role == null) throw new Error("Indiquez un role !");
    const users = await new UsersService().listByRole(role);
    return users;
  }

  @Query(() => User)
  async findUserById(@Arg("id") id: string) {
    if (isNaN(+id)) throw new Error("Indiquez un id correct");
    const userById = await new UsersService().findById(+id);
    if (!userById) throw new Error("Attention, le client n'existe pas");
    return userById;
  }

  @Query(() => User)
  async findUserByEmail(@Arg("email") email: string) {
    const userByEmail = await new UsersService().findByEmail(email);
    if (!userByEmail) throw new Error("Attention, le client n'existe pas");
    return userByEmail;
  }

  @Query(() => User)
  async findUserByPseudo(@Arg("pseudo") pseudo: string) {
    const userByPseudo = await new UsersService().findByPseudo(pseudo);
    if (!userByPseudo) throw new Error("Attention, le client n'existe pas");
    return userByPseudo;
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

  @Mutation(() => User)
  async deleteUser(@Arg("id") id: number) {
    const delUser = await new UsersService().delete(id);
    return delUser;
  }
}
