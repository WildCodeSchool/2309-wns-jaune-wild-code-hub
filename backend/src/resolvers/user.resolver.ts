import { Arg, Ctx, Mutation, Query, Resolver, Authorized } from "type-graphql";
import UsersService from "../services/users.service";
import {
  User,
  CreateUserInput,
  UpdateUserInput,
  ROLE,
  Message,
  InputLogin,
  DeleteUserInput,
} from "../entities/user.entity";
import * as argon2 from "argon2";
import { SignJWT } from "jose";
import { MyContext } from "..";
import Cookies from "cookies";
import { Project } from "../entities/project.entity";
import {
  emailRegex,
  pseudoRegex,
  passwordRegex,
  checkRegex
} from "../regex";

@Resolver()
export class UserResolver {

  @Authorized(["ADMIN"])
  @Query(() => [User])
  async listUsers() {
    const users = await new UsersService().list();
    return users;
  }

  @Authorized(["ADMIN"])
  @Query(() => [User])
  async listUsersByRole(@Arg("role") role: ROLE) {
    const users = await new UsersService().listByRole(role);
    return users;
  }


  @Query(() => [User])
  async listUsersByPseudo(@Arg("pseudo") pseudo: string) {
    const users = await new UsersService().listUsersByPseudo(pseudo);
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
    if (!userByPseudo)
      throw new Error("Please note, the client does not exist");
    return userByPseudo;
  }

  @Mutation(() => Message)
  async login(@Arg("infos") infos: InputLogin, @Ctx() ctx: MyContext) {
    let user;
    if (!infos.email && !infos.pseudo) {
      throw new Error("Check your login information !");
    } else if (infos.email) {
      user = await new UsersService().findByEmail(infos.email);
    } else {
      user = await new UsersService().findByPseudo(infos.pseudo);
    }
    if (!user) {
      throw new Error("Check your login information !");
    }

    const isPasswordValid = await argon2.verify(user.password, infos.password);
    const m = new Message();
    if (isPasswordValid) {
      const token = await new SignJWT({
        email: user.email,
        role: user.role,
        pseudo: user.pseudo,
        id: user.id,
      })
        .setProtectedHeader({ alg: "HS256", typ: "jwt" })
        .setExpirationTime("1d")
        .sign(new TextEncoder().encode(`${process.env.SECRET_KEY}`));

      let cookies = new Cookies(ctx.req, ctx.res);
      cookies.set("token", token, { httpOnly: true });

      m.message = "You are connected!";
      m.success = true;
    } else {
      m.message = "Check your login information !";
      m.success = false;
    }
    return m;
  }

  @Mutation(() => User)
  async register(@Arg("data") data: CreateUserInput) {
    const email = await new UsersService().findByEmail(data.email);
    const pseudo = await new UsersService().findByPseudo(data.pseudo);

    if (email && pseudo) {
      throw new Error("This email and pseudo is already in use!");
    } else if (email) {
      throw new Error("This email is already in use!");
    } else if (pseudo) {
      throw new Error("This pseudo is already in use!");
    }
    
    if (!checkRegex(emailRegex, data.email))
      throw new Error("Invaid format email.");

    if (!checkRegex(pseudoRegex, data.pseudo))
      throw new Error("Invaid format pseudo.");

    if (!checkRegex(passwordRegex, data.password) || data.password.length < 8)
      throw new Error("Requires at least 1 uppercase letter, 1 number, and 1 special character. (8 minimum characters for password)");

    const newUser = await new UsersService().create(data);
    return newUser;
  }

  @Authorized()
  @Mutation(() => Message)
  async updateUser(@Arg("data") data: UpdateUserInput, @Ctx() ctx: MyContext) {

    if (!ctx.user)
      throw new Error("Access denied! You need to be authenticated to perform this action!");

    if (ctx.user.role !== "ADMIN" && data.id != ctx.user.id)
      throw new Error("You must be a site administrator to do this action!"); 

    const { id, ...otherData } = data;
    if (otherData.password) {
      otherData.password = await argon2.hash(otherData.password);
    }

    if (data?.email) {
      const checkUserEmail = await new UsersService().findByEmail(data?.email);
      if (checkUserEmail && data.id != checkUserEmail.id)
        throw new Error("This email already exists in our database!");

      if (!checkRegex(emailRegex, data.email))
        throw new Error("Invaid format email.");
    }

    if (data?.pseudo) {
      const checkUserPseudo = await new UsersService().findByPseudo(data?.pseudo);
      if (checkUserPseudo && data.id != checkUserPseudo.id)
        throw new Error("This pseudo already exists in our database!");

      if (!checkRegex(pseudoRegex, data.pseudo))
        throw new Error("Invaid format pseudo.");
    }

    if (data?.password) {
      if (!checkRegex(passwordRegex, data.password) || data.password.length < 8)
        throw new Error("Requires at least 1 uppercase letter, 1 number, and 1 special character. (8 minimum characters for password)");
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

  @Authorized()
  @Mutation(() => Message)
  async deleteUser(@Arg("data") data: DeleteUserInput, @Ctx() ctx: MyContext) {

    if (!ctx.user)
      throw new Error("Access denied! You need to be authenticated to perform this action!");

    if (ctx.user.role !== "ADMIN" && data.id != ctx.user.id)
      throw new Error("You must be a site administrator to do this action!"); 

    const user = await new UsersService().findById(data.id);

    if (!user)
      throw new Error("Unable to find this user!"); 

    const isPasswordValid = await argon2.verify(user?.password, data.password);

    if (!isPasswordValid && ctx.user.role !== "ADMIN")
      throw new Error("The password is incorrect!"); 

    const delUser = await new UsersService().delete(data.id);
    const m = new Message();

    if (delUser) {

      if (ctx.user.role !== "ADMIN" && data.id == ctx.user.id) {
        ctx.res?.clearCookie("token");
      }

      if (ctx.user.role === "ADMIN" && data.id == ctx.user.id) {
        ctx.res?.clearCookie("token");
      }

      m.message = "User deleted!";
      m.success = true;
    } else {
      m.message = "Unable to delete user!";
      m.success = false;
    }

    return m;
  }

  @Authorized()
  @Query(() => Message)
  async logout(@Ctx() ctx: MyContext) {
    if (ctx.user) {
      ctx.res.clearCookie("token");
    }
    const m = new Message();
    m.message = "You have been disconnected !";
    m.success = true;

    return m;
  }

  @Authorized()
  @Mutation(() => Message)
  async addLikeProject(
    @Arg("projectId") projectId: number,
    @Ctx() ctx: MyContext
  ) {

    if (!ctx.user)
      throw new Error("Access denied! You need to be authenticated to perform this action!");

    const likedProjects = await new UsersService().likeProject(
      ctx.user.id,
      projectId
    );

    const m = new Message();

    if (likedProjects) {
      m.message = "Your Like has been successfully saved!";
      m.success = true;
    } else {
      m.message = "Your like could not be saved";
      m.success = false;
    }

    return m;
  }

  @Authorized()
  @Mutation(() => Message)
  async deleteLikeProject(
    @Arg("projectId") projectId: number,
    @Ctx() ctx: MyContext
  ) {

    if (!ctx.user)
      throw new Error("Access denied! You need to be authenticated to perform this action!");

    const likedProjects = await new UsersService().dislikeProject(
      ctx.user.id,
      projectId
    );

    const m = new Message();

    if (likedProjects) {
      m.message = "Your like has been successfully removed!";
      m.success = true;
    } else {
      m.message = "Your like could not be removed.";
      m.success = false;
    }

    return m;
  }

  @Query(() => User)
  async findProjectOwner(@Arg("projectId") projectId: string) {
    const projectOwner = await new UsersService().findOwner(+projectId);
    return projectOwner;
  }
}