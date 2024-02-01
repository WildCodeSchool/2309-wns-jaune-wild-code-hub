import { In, Like, Repository } from "typeorm";
import {
  Ad,
  CreateAdInput,
  FilterAd,
  UpdateAdInput,
} from "../entities/ad.entity";
import datasource from "../db";
import { validate } from "class-validator";
import CategoryService from "./category.service";
import { aggregateErrors } from "../lib/utilities";
import { Category } from "../entities/category.entity";
// import AggregateError from "aggregate-error";
export default class AdsService {
  db: Repository<Ad>;
  dbCategory: Repository<Category>;
  constructor() {
    this.db = datasource.getRepository(Ad);
    this.dbCategory = datasource.getRepository(Category);
  }

  async listWithFilter({ title, categoryId }: FilterAd) {
    return await this.db
      .createQueryBuilder("a")
      .select(["a.id", "a.title"])
      .leftJoinAndSelect("a.category", "category")
      .where("LOWER(a.title) LIKE :title", {
        title: `%${title.toLowerCase()}%`,
      })
      .getMany();
  }

  async listUsers() {
    return this.db.find();
  }

}