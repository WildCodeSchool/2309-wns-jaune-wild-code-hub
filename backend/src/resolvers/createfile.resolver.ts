import { Arg, Float, Mutation, Query, Resolver } from "type-graphql";
import { File, CreateFileInput } from "../entities/createfile.entity";
import FilesService from "../services/file.service";

@Resolver()
export class CreateResolver {
  //   @Query(() => [CreateFile]){
  //   async ListCreateFile(){
  //     const files =await new FilesService().list();
  //     return files;
  //   }
  // }
}
