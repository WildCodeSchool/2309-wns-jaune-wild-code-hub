import { In, Like, Repository } from "typeorm";
import {
  User,
} from "../entities/user.entity";
import datasource from "../db";
import { validate } from "class-validator";
// import AggregateError from "aggregate-error";
export default class AdsService {
  db: Repository<User>;
  constructor() {
    this.db = datasource.getRepository(User);
  }
  async listUsers() {
    return this.db.find();
  }

}