import {
  Arg,
  Int,
  Mutation,
  Query,
  Resolver,
  Authorized,
  Ctx,
} from "type-graphql";
import {
  CreateProjectInput,
  Project,
  UpdateProjectInput,
  PaginatedProjects,
} from "../entities/project.entity";
import { Message, User } from "../entities/user.entity";
import { MyContext } from "../index";
import {
  FindAllInfoUserAccessesProject,
  UserAccessProjectOutput,
  UserRole,
} from "../entities/usersProjectsAccesses.entity";
import ProjectsService from "../services/projects.service";
import UserProjectAccessesService from "../services/userProjectAccesses.service";

@Resolver()
export class ProjectResolver {

  @Authorized(["ADMIN"])
  @Query(() => [Project])
  async listProjects() {
    const projects = await new ProjectsService().list();
    return projects;
  }

  @Query(() => Project)
  async findProjectById(
    @Arg("id") id: string,
    @Ctx() context: MyContext
  ): Promise<Project | undefined> {
    
    if (isNaN(+id)) throw new Error("Specify a correct id");

    const projectById = await new ProjectsService().findById(+id);

    if (!projectById)
      throw new Error("Please note, the project does not exist");

    if (!projectById.private || context.user?.role === "ADMIN")
      return projectById;

    if (projectById.private && context.user == null)
      throw new Error(
        "Access denied! You need to be authenticated to perform this action!"
      );

    const userAccessesProject = projectById.usersProjectsAccesses;
    const checkUserAccessesProject = userAccessesProject.filter(
      (user) => user.user_id === context.user?.id
    );

    if (checkUserAccessesProject.length === 0)
      throw new Error("You do not have permission to access this project!");

    return projectById;
  }

  @Query(() => Project)
  async findProjectByName(@Arg("name") name: string) {
    const projectByName = await new ProjectsService().findByName(name);
    if (!projectByName)
      throw new Error("Please note, the project does not exist");
    return projectByName;
  }

  @Query(() => PaginatedProjects)
  async listPublicProjects(
    @Arg("offset", () => Int, { defaultValue: 0 }) offset: number,
    @Arg("limit", () => Int, { defaultValue: 8 }) limit: number
  ): Promise<PaginatedProjects> {
    const projects = await new ProjectsService().listByPublic(offset, limit);
    return projects;
  }

  @Query(() => [Project])
  async listPublicProjectsByName(@Arg("name") name: string) {
    const projectsPublicByName = await new ProjectsService().listPublicProjectsByName(name);
    if (!projectsPublicByName)
      throw new Error("Please note, the project does not exist")
    console.log(projectsPublicByName)
    return projectsPublicByName;
  }  

  @Query(() => [Project])
  async listProjectsByCategory(@Arg("category") category: string) {
    const projects = await new ProjectsService().listByCategory(category);
    return projects;
  }

  @Authorized()
  @Query(() => [Project])
  async listProjectsByUser(@Arg("id") id: string, @Ctx() ctx: MyContext) {
    if (!ctx.user)
      throw new Error(
        "Access denied! You need to be authenticated to perform this action!"
      );

    if (ctx.user.role !== "ADMIN" && +id != ctx.user.id)
      throw new Error("You must be a site administrator to do this action!");

    const projects = await new ProjectsService().listByUserId(+id);
    return projects;
  }

  @Authorized()
  @Query(() => [UserAccessProjectOutput])
  async listProjectsByUserWithRole(
    @Arg("id") id: string,
    @Arg("userRole", () => [String], { nullable: true }) userRole?: UserRole[]
  ) {
    const projects = await new ProjectsService().ListByUserWithRole(
      +id,
      userRole
    );
    return projects;
  }

  @Query(() => [UserAccessProjectOutput])
  async listPublicProjectsOwnedByUser(@Arg("id") id: string) {
    const projects = await new ProjectsService().ListPublicOwnedByUser(+id);
    return projects;
  }

  @Query(() => [Project])
  async listProjectsPublicLikeByUser(@Arg("userID") userID: number) {
    const projects = await new ProjectsService().listProjectsPublicLikeByUser(userID);
    return projects;
  }

  @Query(() => [Project])
  async listLikeProject(@Arg("userId") userId: string) {
    const projects = await new ProjectsService().listLikedProjects(+userId);
    if (projects.length === 0) {
      throw new Error("You have no plans !");
    }
    return projects;
  }

  @Authorized()
  @Mutation(() => Project)
  async createProject(
    @Arg("data") data: CreateProjectInput,
    @Ctx() context: MyContext
  ) {
    if (!context.user)
      throw new Error(
        "Access denied! You need to be authenticated to perform this action!"
    );

    const newProject = await new ProjectsService().create(
      data,
      context?.user?.id
    );

    return newProject;
  }

  @Authorized()
  @Mutation(() => Message)
  async updateProject(
    @Arg("data") data: UpdateProjectInput,
    @Ctx() ctx: MyContext
  ) {
    const { id, ...otherData } = data;

    if (!ctx.user)
      throw new Error(
        "Access denied! You need to be authenticated to perform this action!"
      );

    const listAccesProject =
      await new UserProjectAccessesService().findUsersByAccessesProject(
        data.id
      );
    const dataOwner = listAccesProject.find(
      (user: FindAllInfoUserAccessesProject) => user?.user_id == ctx?.user?.id
    );

    if (dataOwner?.role !== "OWNER" && ctx.user.role !== "ADMIN")
      throw new Error("You must be the owner of the project to modify it!");

    const updateProject = await new ProjectsService().update(+id, otherData);
    const m = new Message();
    if (updateProject) {
      m.message = "Project update !";
      m.success = true;
    } else {
      m.message = "Unable to update project !";
      m.success = false;
    }
    return m;
  }

  @Authorized()
  @Mutation(() => Message)
  async deleteProject(@Arg("id") id: number, @Ctx() ctx: MyContext) {
    if (!ctx.user)
      throw new Error(
        "Access denied! You need to be authenticated to perform this action!"
      );

    const listAccesProject =
      await new UserProjectAccessesService().findUsersByAccessesProject(id);
    const dataOwner = listAccesProject.find(
      (user: FindAllInfoUserAccessesProject) => user?.user_id == ctx?.user?.id
    );

    if (dataOwner?.role !== "OWNER" && ctx.user.role !== "ADMIN")
      throw new Error("You must be the owner of the project to delete it!");

    const delProject = await new ProjectsService().delete(id);
    const m = new Message();
    if (delProject) {
      m.message = "Project deleted!";
      m.success = true;
    } else {
      m.message = "Unable to delete project!";
      m.success = false;
    }
    return m;
  }

  @Query(() => Int)
  async countLikesPerProject(@Arg("projectId") projectId: number) {
    const projectsService = new ProjectsService();
    const count = await projectsService.countLikes(projectId);
    return count;
  }

  @Query(() => [User])
  async listUsersLikesPerProject(@Arg("projectId") projectId: number) {
    const projects = await new ProjectsService().listLikedUsers(projectId);
    return projects;
  }

}
