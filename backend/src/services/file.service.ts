import { In, Like, Repository } from "typeorm";
import datasource from "../lib/db";
import { File, CreateFileInput } from "../entities/file.entity";

export default class FilesService {
  db: Repository<File>;
  constructor() {
    this.db = datasource.getRepository(File);
  }
  async list() {
    return this.db.find();
  }

  async create(data: CreateFileInput) {
    const newFile = await this.db.create({ ...data });
    return await this.db.save(newFile);
  }
}
