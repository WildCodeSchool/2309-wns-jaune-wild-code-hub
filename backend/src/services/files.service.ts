import { In, Like, Repository } from "typeorm";
import datasource from "../lib/db";
import {
  File,
  CreateFileInput,
  UpdateFileInput,
} from "../entities/file.entity";
import { validate } from "class-validator";
import { Message } from "../entities/user.entity";

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
    const newFile = this.db.create({
      ...data,
      project: { id: data.project_id },
    });
    return await this.db.save(newFile);
  }

  async createDefaultFiles(projectId: number) {
    const defaultFiles = [
      { name: "index", type: "file", language: "html", extension: "html", content: "", project: {id : projectId } },
      { name: "style", type: "file", language: "css", extension: "css", content: "", project: {id : projectId } },
      { name: "index", type: "file", language: "javascript", extension: "js", content: "", project: {id : projectId } },
    ];

    const files: File[] = [];

    for (const fileData of defaultFiles) {
      const savedFile = await this.create({
        ...fileData,
        project_id : projectId
      })
      files.push(savedFile);
    }
    return files;
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

  async updateMultiple(data: UpdateFileInput[]) {
    const messages: Message[] = [];
    for (const fileData of data) {
      const { id, ...otherData } = fileData;
      const updateFile = await this.update(id, otherData);
      console.log(updateFile)
      const m = new Message();
      if (updateFile) {
        m.message = `File with name ${otherData.name}.${otherData.extension} updated!`;
        m.success = true;
      } else {
        m.message = `Unable to update file with name ${otherData.name}.${otherData.extension}!`;
        m.success = false;
      }
      messages.push(m);
    }
    return messages;
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
