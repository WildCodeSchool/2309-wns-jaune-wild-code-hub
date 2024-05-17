import { Arg, Float, Ctx,  Mutation, Query, Resolver } from "type-graphql";
import UsersService from "../services/users.service";
import { User, CreateUserInput, UpdateUserInput, ROLE, Message, InputLogin } from "../entities/user.entity";
import * as argon2 from "argon2";
import { SignJWT } from "jose";
import { MyContext } from "..";
import Cookies from "cookies";
import { Project } from "../entities/project.entity";
import { CreateUserProjectAccessesInput, UpdateUserProjectAccessesInput, UsersProjectsAccesses } from "../entities/userProjectAccesses.entity";

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
        id : user.id
      })
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
  
  @Query(() => Message)
  async logout(@Ctx() ctx: MyContext) {
    if (ctx.user) {
      let cookies = new Cookies(ctx.req, ctx.res);
      cookies.set("token");
    }
    const m = new Message();
    m.message = "You have been disconnected !";
    m.success = true;
    
    return m;
  }

  @Query(() => [Project])
  async listLikeProject(@Arg("userId") userId: number) {
    const projects = await new UsersService().listLikedProjects(userId);
    if (projects.length === 0) {
      throw new Error("You have no plans !");
    }
    return projects;
  }

  @Mutation(() => Message)
  async addLikeProject(@Arg("userId") userId: number, @Arg("projectId") projectId: number) {

    const likedProjects = await new UsersService().likeProject(userId, projectId);

    const m = new Message();

    if (likedProjects) {
      m.message = "You liked";
      m.success = true;
    } else {
      m.message = "Unable to like";
      m.success = false;
    }

    return m;

  }

  @Mutation(() => Message)
  async deleteLikeProject(@Arg("userId") userId: number, @Arg("projectId") projectId: number) {

    const likedProjects = await new UsersService().dislikeProject(userId, projectId);

    const m = new Message();

    if (likedProjects) {
      m.message = "like deleted";
      m.success = true;
    } else {
      m.message = "unable to remove like";
      m.success = false;
    }

    return m;
    
  }

  @Query(() => [Project])
  async listAccesProject (@Arg("userId") userId: number) {
    const listAccesProject = await new UsersService().findUsersByAccessesProject(userId);
    return listAccesProject;
  }

  @Mutation(() => Message)
  async addAccessProject (@Arg("data") data: CreateUserProjectAccessesInput) {
    const user = await new UsersService().findByAccessesProject(data.user_id, data.project_id);
    
    if (user) {
      throw new Error("This user already has access to this project!");
    }

    if (user) throw new Error("This name of project is already in use!");
    
    const newUserAccessesProject = await new UsersService().createAccessesProject(data);
    
    const m = new Message();

    if (newUserAccessesProject) {
      m.message = "Add user project!";
      m.success = true;
    } else {
      m.message = "Unable to add user project!";
      m.success = false;
    }

    return m;
  }

  @Mutation(() => Message)
  async deleteAccessProject (@Arg("userId") userId: number, @Arg("projectId") projectId: number) {

    const deleteUserAccessesProject = await new UsersService().deleteAccessesProject(userId, projectId);
    
    const m = new Message();

    if (deleteUserAccessesProject) {
      m.message = "Delete user project!";
      m.success = true;
    } else {
      m.message = "Unable to delete user project!";
      m.success = false;
    }

    return m;
  }

}
