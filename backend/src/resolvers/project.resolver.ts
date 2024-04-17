import { Arg, Float, Mutation, Query, Resolver } from "type-graphql";
import { Project } from "../entities/project.entity";
import ProjectsService from "../services/projects.service";


@Resolver()
export class ProjectResolver {
  @Query(() => [Project])
  async ListProjects() {
    const projects = await new ProjectsService().list();
    return projects;
  }
}