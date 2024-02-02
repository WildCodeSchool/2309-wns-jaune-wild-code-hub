import { In, Like, Repository } from "typeorm";
import datasource from "../db";
import { Project } from "../entities/project.entity";
 
export default class ProjectsService {
  db: Repository<Project>;
  constructor() {
    this.db = datasource.getRepository(Project);
  }
  async list() {
    return this.db.find();
  }

}