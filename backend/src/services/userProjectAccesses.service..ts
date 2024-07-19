import { Repository } from "typeorm";
import datasource from "../lib/db";
import {
  UsersProjectsAccesses,
  CreateUserProjectAccessesInput,
} from "../entities/userProjectAccesses.entity";

export default class UserProjectAccessesService {
  db: Repository<UsersProjectsAccesses>;

  constructor() {
    this.db = datasource.getRepository(UsersProjectsAccesses);
  }

  async findByAccessesProject (userId: number, projectId: number) {
    const users = await this.db.find({
      where: { user_id : userId },
    });

    if (users.length === 0) {
      throw new Error("User not found!");
    }

    const filterUserAndProject = users.find(user => user.project_id === projectId);

    return filterUserAndProject;
  }

  async findUsersByAccessesProject (userId: number) {
    const userAccesses = await this.db.find({
      where: { user_id: userId },
      relations: ['project.usersProjectsAccesses', 'project.files']
    });

    const projects = userAccesses.map(access => {access.project, access.role});
    return projects;
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
}
