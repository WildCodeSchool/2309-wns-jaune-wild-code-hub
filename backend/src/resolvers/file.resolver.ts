import {
  Arg,
  Authorized,
  Ctx,
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
import { MyContext } from "..";
import UserProjectAccessesService from "../services/userProjectAccesses.service";

@Resolver()
export class FileResolver {

  @Query(() => [File])
  async listFilesByProject(@Arg("project_id") project_id: string) {
    const files = await new FilesService().listFilesByProjectId(project_id);
    return files;
  }

  @Query(() => File)
  async findFileById(@Arg("id") id: string) {
    const fileById = await new FilesService().findById(+id);
    if (!fileById) throw new Error("File does not exit");
    return fileById;
  }

  @Authorized()
  @Mutation(() => File)
  async createFile(@Arg("data") data: CreateFileInput, @Ctx() context: MyContext) {

    if (context.user == null)
      throw new Error("Access denied! You need to be authenticated to perform this action!");

    if (context.user.role !== "ADMIN") {    
      const listUsersAccessesProject = await new UserProjectAccessesService().findUsersByAccessesProject(+data.project_id);
  
      const findUserRoleAccessesProject = listUsersAccessesProject.find(user => user.user_id === context.user?.id);
  
      if (!findUserRoleAccessesProject)
        throw new Error("You do not have access to this project!");
  
      if (findUserRoleAccessesProject.role === "VIEWER")
        throw new Error("You must be an owner or editor to create this file!");
    }

    const checkDuplicateFileProject = await new FilesService().findFileDuplicate(
      data.project_id,
      data.name,
      data.language,
      data.extension
    );

    if (checkDuplicateFileProject)
      throw new Error("You do not have the right to add a new file with the same name and using the same language!");

    const newFile = await new FilesService().create(data);
    return newFile;
  }


  @Authorized()
  @Mutation(() => Message)
  async updateFile(@Arg("data") data: UpdateFileInput, @Ctx() context: MyContext) {

    if (context.user == null)
      throw new Error("Access denied! You need to be authenticated to perform this action!");
    
    const fileById = await new FilesService().findById(data.id);
    if (!fileById) throw new Error("File does not exit");

    if (context.user.role !== "ADMIN") {
      const listUsersAccessesProject = await new UserProjectAccessesService().findUsersByAccessesProject(+fileById.project.id);
  
      const findUserRoleAccessesProject = listUsersAccessesProject.find(user => user.user_id === context.user?.id);
  
      if (!findUserRoleAccessesProject)
        throw new Error("You do not have access to this project!");
  
      if (findUserRoleAccessesProject.role === "VIEWER")
        throw new Error("You must be an owner or editor to update this file!");
    }

    const checkDuplicateFileProject = await new FilesService().findFileDuplicate(
      fileById.project.id,
      data.name,
      data.language,
      data.extension
    );

    if (checkDuplicateFileProject && checkDuplicateFileProject.id !== data.id)
      throw new Error("You do not have the right to modify this file because a file with the same name and using the same language already exists.");

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
  async updateMultipleFiles(@Arg("data", () => [UpdateFileInput]) data: UpdateFileInput[], @Ctx() context: MyContext) {

    if (context.user == null)
      throw new Error("Access denied! You need to be authenticated to perform this action!");

    if (data.length === 0)
      throw new Error("Please create at least one file to save it!");
    
    const fileById = await new FilesService().findById(data[0].id);
    if (!fileById) throw new Error("File does not exit");

    if (context.user.role !== "ADMIN") {
      const listUsersAccessesProject = await new UserProjectAccessesService().findUsersByAccessesProject(+fileById.project.id);
  
      const findUserRoleAccessesProject = listUsersAccessesProject.find(user => user.user_id === context.user?.id);
  
      if (!findUserRoleAccessesProject)
        throw new Error("You do not have access to this project!");
  
      if (findUserRoleAccessesProject.role === "VIEWER")
        throw new Error("You must be an owner or editor to delete this file!");
      
    }
    
    const messages = await new FilesService().updateMultiple(data);
    return messages;
  }

  @Authorized()
  @Mutation(() => Message)
  async deleteFile(@Arg("id") id: number, @Ctx() context: MyContext) {

    if (context.user == null)
      throw new Error("Access denied! You need to be authenticated to perform this action!");
    
    const fileById = await new FilesService().findById(id);
    if (!fileById) throw new Error("File does not exit");

    if (context.user.role !== "ADMIN") {
      const listUsersAccessesProject = await new UserProjectAccessesService().findUsersByAccessesProject(+fileById.project.id);
  
      const findUserRoleAccessesProject = listUsersAccessesProject.find(user => user.user_id === context.user?.id);
  
      if (!findUserRoleAccessesProject)
        throw new Error("You do not have access to this project!");
  
      if (findUserRoleAccessesProject.role === "VIEWER")
        throw new Error("You must be an owner or editor to delete this file!");
      
    }
    
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
