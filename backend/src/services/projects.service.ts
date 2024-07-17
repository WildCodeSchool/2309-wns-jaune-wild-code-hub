import { In, Like, Repository, SelectQueryBuilder } from "typeorm";
import datasource from "../lib/db";
import {
  Project,
  CreateProjectInput,
  UpdateProjectInput,
} from "../entities/project.entity";
import { validate } from "class-validator";
import { UsersProjectsAccesses } from "../entities/userProjectAccesses.entity";
import { File, CreateFileInput } from "../entities/file.entity";
import FilesService from "./files.service";
export default class ProjectsService {
  db: Repository<Project>;
  fileDb: Repository<File>;
  constructor() {
    this.db = datasource.getRepository(Project);
    this.fileDb = datasource.getRepository(File);
  }

  async list() {
    // return this.db.find();
    const projects = await this.db.find({ relations: ["files"] });
    return projects;
  }

  async findById(id: number) {
    // const project = await this.db.findOne({
    //   where: { id },
    // });
    const project = await this.db.findOne({
      where: { id },
      relations: ["files"],
    });
    return project;
  }

  async findByName(name: string) {
    // const project = await this.db.findOne({
    //   where: { name },
    // });
    const project = await this.db.findOne({
      where: { name },
      relations: ["files"],
    });
    return project;
  }

  async listByCategory(category: string) {
    // const projects = await this.db.find();
    // return projects.filter(
    //   (project) => project.category.toLowerCase() === category.toLowerCase()
    // );
    const projects = await this.db.find({
      where: { category: Like(`%${category}%`) },
      relations: ["files"],
    });
    return projects;
  }

  async listByPublic() {
    const project = await this.db.find({
      where: {
        private: false,
      },
      relations: ["files"],
    });
    return project;
  }

  // async listByUserId(id: number) {
  //   const projects = await this.db.find({
  //     where: {
  //       user: { id },
  //     },
  //   });
  //   return projects;
  // }

  async create(data: CreateProjectInput) {
    console.log("DEBUG Service - Received data: ", data); 
    const newProject = this.db.create(data);
    console.log("DEBUG Service - New Project Entity: ", newProject); 
    const savedProject = await this.db.save(newProject);
    console.log("DEBUG Service - Saved Project: ", savedProject); 

    console.log("avant files")

    
    // const files = await this.createDefaultFiles(savedProject.id);
    // await this.createDefaultFiles(savedProject.id);
    // console.log("files create", files)
    // savedProject.files = files;

    // const projectWithFiles = await this.db.findOne({
    //   where: { id: savedProject.id },
    //   relations: ["files"],
    // });
    // console.log("DEBUG Service - Project with Files: ", projectWithFiles);

    // console.log("projectWithFiles", projectWithFiles)

    return savedProject;
  }

  async createDefaultFiles(projectId: number) {
    console.log("tototto", projectId) 
    const defaultFiles = [
      { name: "index", type: "file", language: "html", extension: "html", content: "", project: {id : projectId } },
      { name: "style", type: "file", language: "css", extension: "css", content: "", project: {id : projectId } },
      { name: "index", type: "file", language: "javascript", extension: "js", content: "", project: {id : projectId } },
    ];

    const files: File[] = [];

    for (const fileData of defaultFiles) {
      // const newFile = this.fileDb.create(fileData);
      // console.log("new File", newFile)
      // //Stop ici les log dans les
      // const savedFile = await this.fileDb.save(newFile);
      const savedFile = await new FilesService().create({
        ...fileData,
        project_id : projectId
      })
      console.log("saved File", savedFile)
      files.push(savedFile);
    }
    // console.log("Mes files", files)
    return files;
  }

  async update(id: number, data: Omit<UpdateProjectInput, "id">) {
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

  async delete(id: number) {
    const projectToDelete = await this.findById(id);
    console.log(projectToDelete);
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
