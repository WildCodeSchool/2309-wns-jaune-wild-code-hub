import { In, Like, Repository, SelectQueryBuilder } from "typeorm";
import datasource from "../lib/db";
import { Search } from "../entities/search.entity";
import { Validate } from "class-validator";
import { Project } from "../entities/project.entity";
import { User } from "../entities/user.entity";
import { File } from "../entities/file.entity";

export default class SearchService {
  db: Repository<Search>;
  constructor() {
    this.db = datasource.getRepository(Search);
  }

  async findByPseudo(pseudo: string) {
    const user = await this.db.findOne({
      where: { pseudo },
    });
    return user;
  }
}
