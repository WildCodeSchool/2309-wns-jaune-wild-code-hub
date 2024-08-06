import { In, Repository } from "typeorm";
import datasource from "../lib/db";
import {
  UsersProjectsAccesses,
  CreateUserProjectAccessesInput,
  UpdateUserProjectAccessesInput,
  UserRole,
} from "../entities/usersProjectsAccesses.entity";
import { validate } from "class-validator";

export default class UserProjectAccessesService {
  db: Repository<UsersProjectsAccesses>;

  constructor() {
    this.db = datasource.getRepository(UsersProjectsAccesses);
  }

  async findByAccessesProject (userId: number, projectId: number) {
    const users = await this.db.find({
      where: { user_id : userId },
    });

    const filterUserAndProject = users.find(user => user.project_id === projectId);

    return filterUserAndProject;
  }

  async findUsersByAccessesProject (project_id: number) {
    const userAccessesProject = await this.db.find({
      where: { project_id: project_id },
      relations: ['project.usersProjectsAccesses', "project.files", "user.usersProjectsAccesses"]
    });
    return userAccessesProject;
  }

  async findProjectsByAccessesUser (user_id: number) {
    const userAccessesProject = await this.db.find({
      where: { user_id: user_id },
      relations: ['project.usersProjectsAccesses', "project.files", "user.usersProjectsAccesses"]
    });
    return userAccessesProject;
  }

  async createAccessesProject (data : CreateUserProjectAccessesInput) {
    const newUserAccessesProject = this.db.create({ ...data });
    return await this.db.save(newUserAccessesProject);
  }

  async deleteAccessesProject (userId: number, projectId: number) {
    const userToDeleteAccessesProject = await this.findByAccessesProject(userId, projectId);
    if (!userToDeleteAccessesProject) {
      throw new Error("This user does not have access to this projec!");
    }
    return await this.db.remove(userToDeleteAccessesProject);
  }

  async updateAccessesProject (data: UpdateUserProjectAccessesInput) {
    const userToDeleteAccessesProject = await this.findByAccessesProject(data.user_id, data.project_id);
    if (!userToDeleteAccessesProject) {
      throw new Error("This user does not have access to this projec!");
    }
    const userToDeleteAccessesProjectToSave = this.db.merge(userToDeleteAccessesProject, {
      ...data,
    });
    const errors = await validate(userToDeleteAccessesProjectToSave);
    if (errors.length !== 0) {
      throw new Error("Error format data");
    }

    return await this.db.save(userToDeleteAccessesProjectToSave);
  }

  async ListPublicOwnedByUser(userId: number) {
    const userAccesses = await this.db.find({
      where: {
        user_id: userId,
        role: UserRole.OWNER,
        project: { private: false },
      },
      relations: ["project.usersProjectsAccesses"],
    });

    return userAccesses;
  }

  async ListByUserWithRole(userId: number, userRole?: UserRole[]) {
    const whereConditions = userRole
      ? {
          role: In(userRole),
          user_id: userId,
        }
      : { user_id: userId };
    const userAccesses = await this.db.find({
      where: whereConditions,
      relations: ["project.usersProjectsAccesses"],
    });

    return userAccesses;
  }
}
