import {
  Arg,
  Authorized,
  Float,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import {
  File,
  CreateFileInput,
  UpdateFileInput,
} from "../entities/file.entity";
import FilesService from "../services/files.service";
import { Message } from "../entities/user.entity";

@Resolver()
export class FileResolver {

  @Query(() => [File])
  async listFilesByProject(@Arg("project_id") project_id: string) {
    const files = await new FilesService().listFilesByProjectId(project_id);
    return files;
  }

  @Query(() => [File])
  async findFileById(@Arg("id") id: string) {
    const fileById = await new FilesService().findById(+id);
    if (!fileById) throw new Error("File does not exit");
    return fileById;
  }

  @Authorized()
  @Mutation(() => File)
  async createFile(@Arg("data") data: CreateFileInput) {
    const file = await new FilesService().findByName(
      data.name,
      data.project_id
    );
    if (file) throw new Error("This name of project is already in use!");
    const newFile = await new FilesService().create(data);
    return newFile;
  }


  @Authorized()
  @Mutation(() => Message)
  async updateFile(@Arg("data") data: UpdateFileInput) {
    const { id, ...otherData } = data;
    const updateFile = await new FilesService().update(id, otherData);
    const m = new Message();
    if (updateFile) {
      m.message = "File update !";
      m.success = true;
    } else {
      m.message = "Unable to update file !";
      m.success = false;
    }
    return m;
  }

  @Authorized()
  @Mutation(() => [Message])
  async updateMultipleFiles(@Arg("data", () => [UpdateFileInput]) data: UpdateFileInput[]) {
    const messages = await new FilesService().updateMultiple(data);
    return messages;
  }

  @Authorized()
  @Mutation(() => Message)
  async deleteFile(@Arg("id") id: number) {
    const delFile = await new FilesService().delete(id);
    const m = new Message();
    if (delFile) {
      m.message = "File deleted!";
      m.success = true;
    } else {
      m.message = "Unable to delete file!";
      m.success = false;
    }
    return m;
  }
}
