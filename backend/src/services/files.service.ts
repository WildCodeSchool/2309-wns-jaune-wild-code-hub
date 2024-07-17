import { In, Like, Repository } from "typeorm";
import datasource from "../lib/db";
import {
  File,
  CreateFileInput,
  UpdateFileInput,
} from "../entities/file.entity";
import { validate } from "class-validator";

export default class FilesService {
  db: Repository<File>;
  constructor() {
    this.db = datasource.getRepository(File);
  }
  async listFilesByProjectId(project_id: string) {
    return this.db.find({
      where: { project: { id: +project_id } },
    });
  }
  async findById(id: number) {
    return this.db.findOne({ where: { id } });
  }
  async findByName(name: string, project_id: number) {
    const file = await this.db.findOne({
      where: { name, project: { id: project_id } },
    });
    return file;
  }
  async create(data: CreateFileInput) {
    const newFile = await this.db.create({
      ...data,
      project: { id: data.project_id },
    });
    return await this.db.save(newFile);
  }

  async update(id: number, data: Omit<UpdateFileInput, "id">) {
    const fileToUpdate = await this.findById(id);
    if (!fileToUpdate) {
      throw new Error("The file does not exist !");
    }
    const fileToSave = this.db.merge(fileToUpdate, {
      ...data,
    });
    const errors = await validate(fileToSave);
    if (errors.length !== 0) {
      console.log(errors);
      throw new Error("Error format data");
    }
    return await this.db.save(fileToSave);
  }
  
  async delete(id: number) {
    const fileToDelete = await this.findById(id);
    console.log(fileToDelete);
    if (!fileToDelete) {
      throw new Error("The file does not exist !");
    }

    return await this.db.remove(fileToDelete);
  }
}
