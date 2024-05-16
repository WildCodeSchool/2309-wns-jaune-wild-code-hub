import { In, Like, Repository, SelectQueryBuilder } from "typeorm";
import datasource from "../lib/db";
import { Project, CreateProjectInput, UpdateProjectInput } from "../entities/project.entity";
import { validate } from "class-validator";

export default class ProjectsService {
  db: Repository<Project>;
  constructor() {
    this.db = datasource.getRepository(Project);
  }

  async list() {
    return this.db.find();
  }

  async findById (id: number) {
    const project = await this.db.findOne({
      where: { id },
    });
    return project;
  }

  async findByName (name: string) {
    const project = await this.db.findOne({
      where: { name },
    });
    return project;
  }

  async listByCategory(category: string) {
    const projects = await this.db.find();
    return projects.filter(project => 
      project.category.toLowerCase() === category.toLowerCase()
    );
  }

  async create (data: CreateProjectInput) {
    const newProject = this.db.create({ ...data });
    return await this.db.save(newProject);
  }

  async update (id: number, data: Omit<UpdateProjectInput, "id">) {
    const projectToUpdate = await this.findById(id);
    if (!projectToUpdate) {
      throw new Error("The project does not exist !");
    }
    const projectToSave = this.db.merge(projectToUpdate, {
      ...data,
    });
    const errors = await validate(projectToSave);
    if (errors.length !== 0) {
      console.log(errors);
      throw new Error("Error format data");
    }
    return await this.db.save(projectToSave);
  }

  async delete (id: number) {
    const projectToDelete = await this.findById(id);
    if (!projectToDelete) {
      throw new Error("The project does not exist !");
    }
    return await this.db.remove(projectToDelete);
  }
    
}
    