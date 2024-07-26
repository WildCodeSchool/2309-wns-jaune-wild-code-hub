import { In, Like, Repository } from "typeorm";
import {
  User,
  CreateUserInput,
  UpdateUserInput,
  ROLE,
  InputChangePassword,
} from "../entities/user.entity";
import { validate } from "class-validator";
import datasource from "../lib/db";
import ProjectsService from "./projects.service";
import { Project } from "../entities/project.entity";
import {
  UsersProjectsAccesses,
  CreateUserProjectAccessesInput,
  UpdateUserProjectAccessesInput,
} from "../entities/userProjectAccesses.entity";
import Reset from "../entities/reset.entity";
import { uuid } from "uuidv4";

export default class UsersService {
  db: Repository<User>;
  dbReset: Repository<Reset>;
  constructor() {
    this.db = datasource.getRepository(User);
    this.dbReset = datasource.getRepository(Reset);
  }

  async list() {
    return this.db.find();
  }

  async listByRole(role: ROLE) {
    return this.db.find({
      where: {
        role: role,
      },
    });
  }

  async findById(id: number) {
    const user = await this.db.findOne({
      where: { id },
    });

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.db.findOne({
      where: { email },
    });

    return user;
  }

  async findByPseudo(pseudo: string) {
    const user = await this.db.findOne({
      where: { pseudo },
    });

    return user;
  }

  async create(data: CreateUserInput) {
    const newUser = this.db.create({ ...data });
    return await this.db.save(newUser);
  }

  async update(id: number, data: Omit<UpdateUserInput, "id">) {
    const userToUpdate = await this.findById(id);
    if (!userToUpdate) {
      throw new Error("The user does not exist !");
    }
    const userToSave = this.db.merge(userToUpdate, {
      ...data,
    });
    const errors = await validate(userToSave);
    if (errors.length !== 0) {
      console.log(errors);
      throw new Error("Error format data");
    }
    return await this.db.save(userToSave);
  }

  async createResetToken(email: string) {
    const user = await this.findByEmail(email);
    if (!user) {
      throw new Error("Ce user n'existe pas");
    }
    let resetToken = await this.dbReset.findOne({
      where: { user: { id: user.id } },
      relations: { user: true },
    });

    if (!resetToken) {
      resetToken = this.dbReset.create({ user });
    }
    const date = new Date();
    date.setMinutes(date.getMinutes() + 10);
    resetToken.expirationDate = new Date(date.getTime());
    resetToken.resetToken = uuid();
    const newResetToken = this.dbReset.create(resetToken);
    const newTokenInstance = await this.dbReset.save(newResetToken);
    return newTokenInstance;
  }

  async findResetToken(token: string) {
    const resetToken = await this.dbReset.findOne({
      where: { resetToken: token },
      relations: { user: true },
    });

    return resetToken;
  }
  async checkResetTokenValidity(token: string) {
    let result = false;
    const resetToken = await this.findResetToken(token);
    if (resetToken) {
      const dateToken = resetToken.expirationDate;
      const date = Date.now();
      result = dateToken.getTime() > date;
    }

    return result;
  }

  async changePassword(password: string, user: User) {
    const editedUser = this.db.create({ ...user });
    editedUser.password = password;

    return await this.db.save(editedUser);
  }
  async delete(id: number) {
    const userToDelete = await this.findById(id);
    if (!userToDelete) {
      throw new Error("The user does not exist !");
    }

    userToDelete.likedProjects = [];

    await this.db
      .createQueryBuilder()
      .delete()
      .from(UsersProjectsAccesses)
      .where("user = :userId", { userId: id })
      .execute();

    return await this.db.remove(userToDelete);
  }

  async listLikedProjects(userId: number) {
    const user = await this.db.findOne({
      where: { id: userId },
      relations: ["likedProjects"],
    });

    if (!user) {
      throw new Error("User not found!");
    }

    return user.likedProjects;
  }

  async likeProject(userId: number, projectId: number) {
    const projectRepository = datasource.getRepository(Project);

    const user = await this.db.findOne({
      where: { id: userId },
      relations: ["likedProjects"],
    });

    const project = await projectRepository.findOne({
      where: { id: projectId },
    });

    if (!user || !project) {
      throw new Error("User or project not found!");
    }

    const filterByProjectId = user.likedProjects.filter(
      (likedProject) => likedProject.id === projectId
    );

    if (filterByProjectId.length !== 0) {
      throw new Error("Project already liked by the user!");
    }

    user.likedProjects.push(project);
    await this.db.save(user);

    return user.likedProjects;
  }

  async dislikeProject(userId: number, projectId: number) {
    const projectRepository = datasource.getRepository(Project);

    const user = await this.db.findOne({
      where: { id: userId },
      relations: ["likedProjects"],
    });

    const project = await projectRepository.findOne({
      where: { id: projectId },
    });

    if (!user || !project) {
      throw new Error("User or project not found!");
    }

    const likedProjectIndex = user.likedProjects.findIndex(
      (likedProject) => likedProject.id === projectId
    );
    if (likedProjectIndex === -1) {
      throw new Error("The user did not like this project!");
    }

    user.likedProjects.splice(likedProjectIndex, 1);
    await this.db.save(user);

    return user.likedProjects;
  }

  async findByAccessesProject(userId: number, projectId: number) {
    const userProjectAccessesRepository = datasource.getRepository(
      UsersProjectsAccesses
    );
    const users = await userProjectAccessesRepository.find({
      where: { user_id: userId },
    });

    if (users.length === 0) {
      throw new Error("User not found!");
    }

    const filterUserAndProject = users.find(
      (user) => user.project_id === projectId
    );

    return filterUserAndProject;
  }

  async findUsersByAccessesProject(userId: number) {
    const userProjectAccessesRepository = datasource.getRepository(
      UsersProjectsAccesses
    );
    const userAccesses = await userProjectAccessesRepository.find({
      where: { user_id: userId },
      relations: ["project.usersProjectsAccesses"],
    });

    const projects = userAccesses.map((access) => access.project);
    return projects;
  }

  async createAccessesProject(data: CreateUserProjectAccessesInput) {
    const userProjectAccessesRepository = datasource.getRepository(
      UsersProjectsAccesses
    );
    const newUserAccessesProject = userProjectAccessesRepository.create({
      ...data,
    });
    return await userProjectAccessesRepository.save(newUserAccessesProject);
  }

  async deleteAccessesProject(userId: number, projectId: number) {
    const userProjectAccessesRepository = datasource.getRepository(
      UsersProjectsAccesses
    );
    const userToDeleteAccessesProject = await this.findByAccessesProject(
      userId,
      projectId
    );
    if (!userToDeleteAccessesProject) {
      throw new Error("This user does not have access to this projec!");
    }
    return await userProjectAccessesRepository.remove(
      userToDeleteAccessesProject
    );
  }
}
