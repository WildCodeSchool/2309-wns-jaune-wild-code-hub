import { In, Like, Repository, UpdateFilter } from "typeorm";
import datasource from "../lib/db";
import { File, CreateFileInput, UpdateFile } from "../entities/file.entity";

export default class FilesService {
  db: Repository<File>;
  constructor() {
    this.db = datasource.getRepository(File);
  }

  async list() {
    return this.db.find();
  }

  async findById(id: number) {
    const file = await this.db.findOne({ where: { id } });
    return file;
  }

  async findByProjectId(project_id: string) {
    const file = await this.db.findOne({ where: { project_id } });
    return file;
  }

  async findByName(name: string) {
    const file = await this.db.findOne({ where: { name } });
    return file;
  }

  async findByLanguage(language: string) {
    const file = await this.db.findOne({ where: { language } });
    return file;
  }

  async create(data: CreateFileInput) {
    const newFile = this.db.create({ ...data });
    return await this.db.save(newFile);
  }

  async update(id: number, data: Omit<UpdateFile, "id">) {
    const fileToUpdate = await this.findById(id);
    if (!fileToUpdate) {
      throw new Error("The file does not exist!");
    }
    await this.db.update(id, data);
    return this.findById(id);
  }

  async delete(id: number) {
    const fileToDelete = await this.findById(id);
    if (!fileToDelete) {
      throw new Error("The file does not exist!");
    }
    await this.db.delete(id);
    return fileToDelete;
  }

  async deleteByName(name: string) {
    const fileToDelete = await this.findByName(name);
    if (!fileToDelete) {
      throw new Error("The file does not exist!");
    }
    await this.db.delete({ name });
    return fileToDelete;
  }

  async deleteByLanguage(language: string) {
    const fileToDelete = await this.findByLanguage(language);
    if (!fileToDelete) {
      throw new Error("The file does not exist!");
    }
    await this.db.delete({ language });
    return fileToDelete;
  }
}
