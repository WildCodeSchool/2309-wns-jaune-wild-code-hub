import {
  Arg,
  Int,
  Float,
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
} from "../entities/project.entity";
import { Message, User } from "../entities/user.entity";
import { MyContext } from "../index"; 
import {
  UserAccessProjectOutput,
  UserRole,
} from "../entities/userProjectAccesses.entity";
import ProjectsService from "../services/projects.service";

@Resolver()
export class ProjectResolver {
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
      throw new Error("Please note, the project does not exist") 

    if (!projectById.private) 
      return projectById;
    
    if (projectById.private && context.user == null) 
      throw new Error("Access denied! You need to be authenticated to perform this action!")

    const userAccessesProject = projectById.usersProjectsAccesses;
    const checkUserAccessesProject = userAccessesProject.filter((user) => user.user_id === context.user?.id);

    if (checkUserAccessesProject.length === 0)
      throw new Error("You do not have permission to access this project!")


    return projectById
  }

  @Query(() => Project)
  async findProjectByName(@Arg("name") name: string) {
    const projectByName = await new ProjectsService().findByName(name);
    if (!projectByName)
      throw new Error("Please note, the project does not exist");
    return projectByName;
  }

  @Query(() => [Project])
  async listPublicProjects() {
    const projects = await new ProjectsService().listByPublic();
    return projects;
  }

  @Query(() => [Project])
  async listProjectsByCategory(@Arg("category") category: string) {
    const projects = await new ProjectsService().listByCategory(category);
    return projects;
  }

  @Authorized()
  @Query(() => [Project])
  async listProjectsByUser(@Arg("id") id: string) {
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

  @Authorized()
  @Mutation(() => Project)
  async createProject(@Arg("data") data: CreateProjectInput) {
    const project = await new ProjectsService().findByName(data.name);
    if (project) throw new Error("This name of project is already in use!");
    const newProject = await new ProjectsService().create(data);

    return newProject;
  }

  @Authorized()
  @Mutation(() => Message)
  async updateProject(@Arg("data") data: UpdateProjectInput) {
    const { id, ...otherData } = data;
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
  async deleteProject(@Arg("id") id: number) {
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
