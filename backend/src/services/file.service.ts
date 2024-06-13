import { In, Like, Repository } from "typeorm";
import datasource from "../lib/db";
import { File, CreateFileInput } from "../entities/file.entity";

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
}
