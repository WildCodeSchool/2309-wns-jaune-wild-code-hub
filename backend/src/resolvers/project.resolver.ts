import { Arg, Int, Float, Mutation, Query, Resolver } from "type-graphql";
import { Project, CreateProjectInput, UpdateProjectInput } from "../entities/project.entity";
import ProjectsService from "../services/projects.service";
import { Message } from "../entities/user.entity";


@Resolver()
export class ProjectResolver {
  @Query(() => [Project])
  async listProjects() {
    const projects = await new ProjectsService().list();
    return projects;
  }
  
  @Query(() => Project)
  async findProjectById(@Arg("id") id: string) {
    if (isNaN(+id)) throw new Error("Specify a correct id");
    const projectById = await new ProjectsService().findById(+id);
    if (!projectById) throw new Error("Please note, the project does not exist");
    return projectById;
  }

  @Query(() => Project)
  async findProjectByName(@Arg("name") name: string) {
    const projectByName = await new ProjectsService().findByName(name);
    if (!projectByName) throw new Error("Please note, the project does not exist");
    return projectByName;
  }

  @Query(() => [Project])
  async listProjectsByCategory(@Arg("category") category: string) {
    const projects = await new ProjectsService().listByCategory(category);
    return projects;
  }

//---------------------------------------- Mutation -----------------------------------------//

  @Mutation(() => Project)
  async createProject(@Arg("data") data: CreateProjectInput) {
    const project = await new ProjectsService().findByName(data.name);
    if (project) throw new Error("This name of project is already in use!");
    const newProject = await new ProjectsService().create(data);
    return newProject;
  }

  
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

  @Mutation(() => Message)
  async deleteProject(@Arg("id") id: number) {
    const delUser = await new ProjectsService().delete(id);
    const m = new Message();
    if (delUser) {
      m.message = "Project deleted!";
      m.success = true;
    } else {
      m.message = "Unable to delete project!";
      m.success = false;
    }
    return m;
  }



}
