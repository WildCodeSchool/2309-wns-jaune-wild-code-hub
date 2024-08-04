import { validate } from "class-validator";
import { getRepository, ILike, In, Like, Repository } from "typeorm";
import {
  CreateProjectInput,
  Project,
  UpdateProjectInput,
} from "../entities/project.entity";
import {
  UserRole,
  UsersProjectsAccesses,
} from "../entities/usersProjectsAccesses.entity";
import datasource from "../lib/db";
import FilesService from "./files.service";
import { File } from "../entities/file.entity";
import UserProjectAccessesService from "./userProjectAccesses.service";
import { User } from "../entities/user.entity";

export default class ProjectsService {
  db: Repository<Project>;
  constructor() {
    this.db = datasource.getRepository(Project);
  }

  async list(offset: number = 0, limit: number = 8) {
    const [projects, total] = await this.db.findAndCount({
      relations: ["files"],
      skip: offset,
      take: limit,
    });

    return {
      projects,
      total,
      offset,
      limit,
    };
  }

  async findById(id: number) {
    const project = await this.db.findOne({
      where: { id },
      relations: ["files", "usersProjectsAccesses"],
    });
    return project;
  }

  async findByName(name: string) {
    const project = await this.db.findOne({
      where: { name },
      relations: ["files"],
    });
    return project;
  }

  async listByCategory(category: string) {
    const projects = await this.db.find({
      where: { category: Like(`%${category}%`) },
      relations: ["files"],
    });
    return projects;
  }

  async listPublicProjectsByName(name: string) {
  const projects = await this.db.find({
   where: {
      name: ILike(`%${name}%`),
      private: false,
    },
    relations: ["files"],
    });
  return projects;
  }

  async listByPublic(offset: number = 0, limit: number = 8) {
    const [projects, total] = await this.db.findAndCount({
      where: {
        private: false,
      },
      relations: ["files"],
      skip: offset,
      take: limit,
    });

    return {
      projects,
      total,
      offset,
      limit,
    };
  }

  async listByUserId(id: number) {
    const projects = await this.db.find({
      where: {
        usersProjectsAccesses: {
          user_id: id,
        },
      },
      relations: ["usersProjectsAccesses"],
    });
    return projects;
  }
  async ListByUserWithRole(userId: number, userRole?: UserRole[]) {
    const userProjectAccessesRepository = datasource.getRepository(
      UsersProjectsAccesses
    );
    const whereConditions = userRole
      ? {
          role: In(userRole),
          user_id: userId,
        }
      : { user_id: userId };
    const userAccesses = await userProjectAccessesRepository.find({
      where: whereConditions,
      relations: ["project.usersProjectsAccesses"],
    });

    return userAccesses;
  }

  async ListPublicOwnedByUser(userId: number) {
    const userProjectAccessesRepository = datasource.getRepository(
      UsersProjectsAccesses
    );

    const userAccesses = await userProjectAccessesRepository.find({
      where: {
        user_id: userId,
        role: UserRole.OWNER,
        project: { private: false },
      },
      relations: ["project.usersProjectsAccesses"],
    });

    return userAccesses;
  }

  async listProjectsPublicLikeByUser(userId: number) {
    const userRepository = datasource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id: userId },
      relations: ["likedProjects", "likedProjects.files"],
    });

    if (!user) {
      throw new Error("User not found!");
    }

    const publicLikedProjects = user.likedProjects.filter(project => !project.private);

    return publicLikedProjects;
  }

  async listLikedProjects(userId: number) {
    const userRepository = datasource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id: userId },
      relations: ["likedProjects"],
    });

    if (!user) {
      throw new Error("User not found!");
    }

    return user.likedProjects;
  }

  async create(data: CreateProjectInput, userId: number) {

    const project = await new ProjectsService().findByName(data.name);
    if (project) throw new Error("This name of project is already in use!");
    
    const newProject = this.db.create(data);
    const savedProject = await this.db.save(newProject);
    if (!savedProject)
      throw new Error("Unable to create this project, please try again later!");

    const files = await new FilesService().createDefaultFiles(savedProject.id);
    savedProject.files = files;

    const dateUserProjectAcesses = {
      user_id: userId,
      project_id: savedProject.id,
      role: "OWNER" as UserRole,
    };

    await new UserProjectAccessesService().createAccessesProject(
      dateUserProjectAcesses
    );

    return savedProject;
  }

  async update(id: number, data: Omit<UpdateProjectInput, "id">) {
    const projectToUpdate = await this.findById(id);
    if (!projectToUpdate) {
      throw new Error("The project does not exist !");
    }

    const checkName = await this.findByName(data.name);

    if (checkName) throw new Error("This project name is already taken!");

    const projectToSave = this.db.merge(projectToUpdate, {
      ...data,
    });
    const errors = await validate(projectToSave);
    if (errors.length !== 0) {
      throw new Error("Error format data");
    }
    return await this.db.save(projectToSave);
  }

  async delete(id: number) {
    const projectToDelete = await this.findById(id);
    if (!projectToDelete) {
      throw new Error("The project does not exist !");
    }

    projectToDelete.likedByUsers = [];

    await this.db
      .createQueryBuilder()
      .delete()
      .from(UsersProjectsAccesses)
      .where("project = :projectId", { projectId: id })
      .execute();

    return await this.db.remove(projectToDelete);
  }

  async countLikes(projectId: number): Promise<number> {
    const project = await this.db.findOne({
      where: { id: projectId },
      relations: ["likedByUsers"],
    });

    if (!project) {
      throw new Error("Project not found!");
    }

    return project.likedByUsers.length;
  }

  async listLikedUsers(projectId: number) {
    const project = await this.db.findOne({
      where: { id: projectId },
      relations: ["likedByUsers"],
    });

    if (!project) {
      throw new Error("User not found!");
    }

    return project.likedByUsers;
  }
}
