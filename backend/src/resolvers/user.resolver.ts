import { Arg, Float, Ctx,  Mutation, Query, Resolver } from "type-graphql";
import UsersService from "../services/users.service";
import { User, CreateUserInput, UpdateUserInput, ROLE, Message, InputLogin } from "../entities/user.entity";
import * as argon2 from "argon2";
import { SignJWT } from "jose";
import { MyContext } from "..";
import Cookies from "cookies";

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

  @Query(() => Message)
  async login(@Arg("infos") infos: InputLogin, @Ctx() ctx: MyContext) {
    let user;
    console.log("email", infos.email)
    if (!infos.email && !infos.pseudo) {
      throw new Error("Check your login information !");
    } else if (infos.email) {
      user = await new UsersService().findByEmail(infos.email);
    } else {
      user = await new UsersService().findByPseudo(infos.pseudo);

    }
    console.log(user)
    if (!user) {
      throw new Error("Check your login information !");
    }

    const isPasswordValid = await argon2.verify(user.password, infos.password);
    console.log(isPasswordValid)
    const m = new Message();
    if (isPasswordValid) {
      const token = await new SignJWT({ email: user.email, role: user.role })
        .setProtectedHeader({ alg: "HS256", typ: "jwt" })
        .setExpirationTime("2h")
        .sign(new TextEncoder().encode(`${process.env.SECRET_KEY}`));

      let cookies = new Cookies(ctx.req, ctx.res);
      cookies.set("token", token, { httpOnly: true });

      m.message = "Welcome !";
      m.success = true;
    } else {
      m.message = "Check your login information !";
      m.success = false;
    }
    console.log(m)
    return m;
  }

  @Mutation(() => User)
  async register(@Arg("data") data: CreateUserInput) {
    const user = await new UsersService().findByEmail(data.email);
    const pseudo = await new UsersService().findByPseudo(data.pseudo);

    if (user && pseudo) {
      throw new Error("This email and pseudo is already in use!");
    } else if (user) {
      throw new Error("This email is already in use!");
    } else if (pseudo) {
      throw new Error("This pseudo is already in use!");
    }
    
    const newUser = await new UsersService().create(data);
    return newUser;
  }

  @Mutation(() => Message)
  async updateUser(@Arg("data") data: UpdateUserInput) {
    const { id, ...otherData } = data;
    if (otherData.password) {
      otherData.password = await argon2.hash(otherData.password);
    }
    const updateUser = await new UsersService().update(+id, otherData);
    const m = new Message();
    if (updateUser) {
      m.message = "User update !";
      m.success = true;
    } else {
      m.message = "Unable to update user !";
      m.success = false;
    }
    return m;
  }

  @Mutation(() => Message)
  async deleteUser(@Arg("id") id: number) {
    const delUser = await new UsersService().delete(id);
    const m = new Message();

    if (delUser) {
      m.message = "User deleted!";
      m.success = true;
    } else {
      m.message = "Unable to delete user!";
      m.success = false;
    }

    return m;
  }
}
