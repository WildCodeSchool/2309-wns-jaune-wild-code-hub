import {
  Arg,
  Authorized,
  Float,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { File, CreateFileInput } from "../entities/file.entity";
import FilesService from "../services/file.service";

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
}
