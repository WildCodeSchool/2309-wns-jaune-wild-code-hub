import { Resolver, Query, Arg } from "type-graphql";
import { File } from "../entities/file.entity";
import { Like, getRepository } from "typeorm";
import FilesService from "../services/file.service";
import { User } from "../entities/user.entity";
import { Project } from "../entities/project.entity";
import { Search } from "../entities/search.entity";

@Resolver()
export class SearchResolver {
  @Query(() => [User])
  async searchUsersByPseudo(@Arg("pseudo") pseudo: string): Promise<User[]> {
    const searchUserPseudo = await User.findByPseudo(pseudo);
    return getRepository.find({
      where: { pseudo: Like(`%${pseudo}%`) },
    });
  }

  @Query(() => [Project])
  async searchProjectsByName(@Arg("name") name: string): Promise<Project[]> {
    const projectRepository = getRepository(Project);
    return projectRepository.find({
      where: { name: Like(`%${name}%`) },
    });
  }

  @Query(() => [Project])
  async searchProjectsByCategory(
    @Arg("category") category: string
  ): Promise<Project[]> {
    const projectRepository = getRepository(Project);
    return projectRepository.find({
      where: { category: Like(`%${category}%`) },
    });
  }

  @Query(() => [File])
  async searchFilesByName(@Arg("name") name: string): Promise<File[]> {
    const fileRepository = getRepository(File);
    return fileRepository.find({
      where: { name: Like(`%${name}%`) },
    });
  }

  @Query(() => [File])
  async searchFilesByCategory(
    @Arg("category") category: string
  ): Promise<File[]> {
    const fileByCategory = await new File().findByCategory(category);
    return fileByCategory.find({
      where: { category: Like(`%${category}%`) },
    });
  }
}
