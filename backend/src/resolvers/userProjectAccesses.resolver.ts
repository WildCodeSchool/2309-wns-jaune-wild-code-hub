import { Arg, Ctx,  Mutation, Resolver, Authorized, Query } from "type-graphql";
import UserProjectAccessesService from "../services/userProjectAccesses.service";
import { Message } from "../entities/user.entity";
import { MyContext } from "..";
import { 
  CreateUserProjectAccessesInput,
  DeleteUserProjectAccessesInput,
  UpdateUserProjectAccessesInput,
  FindAllInfoUserAccessesProject,
  UserAccessProjectResponse,
} from "../entities/usersProjectsAccesses.entity";
import { Project } from "../entities/project.entity";

@Resolver()
export class UserProjectAccessesResolver {

  @Query(() => [FindAllInfoUserAccessesProject])
  async listUsersAccessesProject (@Arg("project_id") project_id: number) {
    const listAccesProject = await new UserProjectAccessesService().findUsersByAccessesProject(project_id);
    return listAccesProject;
  }

  @Query(() => [FindAllInfoUserAccessesProject])
  async listProjectsAccessesUser (@Arg("user_id") user_id: number) {
    const listAccesProject = await new UserProjectAccessesService().findProjectsByAccessesUser(user_id);
    return listAccesProject;
  }

  @Authorized()
  @Mutation(() => UserAccessProjectResponse)
  async addAccessProject (@Arg("data") data: CreateUserProjectAccessesInput, @Ctx() context: MyContext) {

    if (context.user == null)
      throw new Error("Access denied! You need to be authenticated to perform this action!");

    const checkUserOwner = await new UserProjectAccessesService().findByAccessesProject(context.user.id, data.project_id);
    
    if (!checkUserOwner)
      throw new Error("You do not have access to this project!");

    if (checkUserOwner.role !== "OWNER" && context.user.role !== "ADMIN")
      throw new Error("You must be owner to give other users access to this project");
    
    if(data.role.toLocaleUpperCase() === "OWNER" && context.user.role !== "ADMIN")
      throw new Error("You do not have the right to add a second owner to the project");
    
    const existingUserAccess = await new UserProjectAccessesService().findByAccessesProject(data.user_id, data.project_id);
    
    if (existingUserAccess)
      throw new Error("This user already has access to this project!");

    const newUserAccessesProject = await new UserProjectAccessesService().createAccessesProject(data);
    
    const m = new Message();

    if (newUserAccessesProject) {
      m.message = "Add user project!";
      m.success = true;
    } else {
      m.message = "Unable to add user project!";
      m.success = false;
    }

    const listUsersAccessesProjectData = await new UserProjectAccessesService().findUsersByAccessesProject(data.project_id);

    return {message : m, listUsersAccessesProjectData : listUsersAccessesProjectData}; 
  }

  @Authorized()
  @Mutation(() => Message)
  async deleteAccessProject (@Arg("data") data: DeleteUserProjectAccessesInput, @Ctx() context: MyContext) {

    if (context.user == null)
      throw new Error("Access denied! You need to be authenticated to perform this action!");

    const checkUserOwner = await new UserProjectAccessesService().findByAccessesProject(context.user.id, data.project_id);
    
    if (!checkUserOwner)
      throw new Error("You do not have access to this project!");

    if (checkUserOwner.role !== "OWNER")
      throw new Error("You must be owner to give other users access to this project");

    const deleteUserAccessesProject = await new UserProjectAccessesService().deleteAccessesProject(data.user_id, data.project_id);
    
    const m = new Message();

    if (deleteUserAccessesProject) {
      m.message = "Delete user project!";
      m.success = true;
    } else {
      m.message = "Unable to delete user project!";
      m.success = false;
    }

    return m;
  }

  @Authorized()
  @Mutation(() => Message)
  async updateAccessProject (@Arg("data") data: UpdateUserProjectAccessesInput, @Ctx() context: MyContext) {

    if (context.user == null)
      throw new Error("Access denied! You need to be authenticated to perform this action!");

    const checkUserOwner = await new UserProjectAccessesService().findByAccessesProject(context.user.id, data.project_id);

    if (!checkUserOwner)
      throw new Error("You do not have access to this project!");

    if (checkUserOwner.role !== "OWNER" && context.user.role !== "ADMIN")
      throw new Error("You must be owner to give other users access to this project");

    if(data.role.toLocaleUpperCase() === "OWNER"  && context.user.role !== "ADMIN")
      throw new Error("You do not have the right to add a second owner to the project");

    const updateUserAccessesProject = await new UserProjectAccessesService().updateAccessesProject(data);
    
    const m = new Message();

    if (updateUserAccessesProject) {
      m.message = "Update user project!";
      m.success = true;
    } else {
      m.message = "Unable to update user project!";
      m.success = false;
    }

    return m;
  }

  @Authorized()
  @Query(() => [Project])
  async listAccesProject(@Arg("userId") userId: number) {
    const listAccesProject = await new UserProjectAccessesService().findUsersByAccessesProject(userId);
    return listAccesProject;
  }

}
