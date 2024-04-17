import { Arg, Float, Mutation, Query, Resolver } from "type-graphql";
import { File, CreateFileInput } from "../entities/file.entity";
import FilesService from "../services/file.service";

@Resolver()
export class FileResolver {
  @Query(() => [File])
  async listFile() {
    const files = await new FilesService().list();
    return files;
  }

@Query (() => [File])
async findFileById(){
  const fileById = await new FilesService().findById(+id)
  if (!fileById) throw new Error("File does not exit")
  return fileById; 
}



    @Mutation(() => CreateFile){
    async register (@Arg("data") data: CreateFileInput){
      const files =await new FilesService().findByFile(data.file_id);
      if (files) throw new Error("this project already exist");
      const newFile = await new FilesService.create(data)

      return newFile;
    }
  }
}
