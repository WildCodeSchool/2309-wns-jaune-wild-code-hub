import { In, Like, Repository } from "typeorm";
import {
  User,
} from "../entities/user.entity";
import datasource from "../db";
// import { validate } from "class-validator";
// import AggregateError from "aggregate-error";
export default class UsersService {
  db: Repository<User>;
  constructor() {
    this.db = datasource.getRepository(User);
  }
  async list() {
    return this.db.find();
  }

}