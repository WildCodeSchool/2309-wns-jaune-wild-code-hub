import { Arg, Float, Mutation, Query, Resolver } from "type-graphql";
import {
  File,
  CreateFileInput,
  UpdateFile,
  DeleteFile,
} from "../entities/file.entity";
import FilesService from "../services/file.service";

@Resolver()
export class FileResolver {
  @Query(() => [File])
  async listFile() {
    const files = await new FilesService().list();
    return files;
  }

  @Query(() => [File])
  async findFileById(@Arg("id") id: number) {
    if (isNaN(+id)) throw new Error("Specify a correct id");
    const fileById = await new FilesService().findById(+id);
    if (!fileById) throw new Error("File does not exit");
    return fileById;
  }

  @Mutation(() => File)
  async register(
    @Arg("data") data: CreateFileInput,
    @Arg("confirm", { defaultValue: false }) confirm: boolean
  ) {
    const existingFileByName = await new FilesService().findByName(data.name);
    if (existingFileByName && !confirm) {
      throw new Error(
        "A file with the same name already exists. Do you want to create a new file anyway?"
      );
    }
    const newFile = await new FilesService().create(data);
    return newFile;
  }

  @Mutation(() => File)
  async updateFile(@Arg("id") id: number, @Arg("data") data: UpdateFile) {
    const fileToUpdate = await this.filesService.findById(id);
    if (!fileToUpdate) throw new Error("File does not exist!");
    const updatedFile = await this.filesService.update(id, data);
    return updatedFile;
  }

  @Mutation(() => Message)
  async deleteFile(@Arg("id") id: number) {
    const fileToDelete = await this.filesService.findById(id);
    if (!fileToDelete) throw new Error("File does not exist!");
    await this.filesService.delete(id);
    const m = new Message();
    m.message = "File deleted successfully!";
    m.success = true;
    return m;
  }

  @Mutation(() => Message)
  async deleteFileByName(@Arg("name") name: string) {
    const fileToDelete = await this.filesService.findByName(name);
    if (!fileToDelete) throw new Error("File does not exist!");
    await this.filesService.deleteByName(name);
    const m = new Message();
    m.message = "File deleted successfully!";
    m.success = true;
    return m;
  }

  @Mutation(() => Message)
  async deleteFileByLanguage(@Arg("language") language: string) {
    const fileToDelete = await this.filesService.findByLanguage(language);
    if (!fileToDelete) throw new Error("File does not exist!");
    await this.filesService.deleteByLanguage(language);
    const m = new Message();
    m.message = "File deleted successfully!";
    m.success = true;
    return m;
  }
  //   @Mutation(() => CreateFile){
  //   async register (@Arg("data") data: CreateFileInput){
  //     const files =await new FilesService().findByFile(data.file_id);
  //     if (files) throw new Error("this project already exist");
  //     const newFile = await new FilesService.create(data)

  //     return newFile;
  //   }
  // }
}
