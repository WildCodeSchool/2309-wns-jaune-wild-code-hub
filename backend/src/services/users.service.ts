import { In, Like, Repository } from "typeorm";
import { User, CreateUserInput } from "../entities/user.entity";
import { validate } from "class-validator";
import datasource from "../db";
//import { aggregateErrors } from "../lib/utilities";
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

  async find(id: number) {
    const user = await this.db.findOne({
      where: { id },
    });

    return user;
  }

  async create(data: CreateUserInput) {
    const newUser = this.db.create({ ...data });

    /* const errors = await validate(newUser);
    console.log("ERRORS => ", errors);

    if (errors.length !== 0) {
     
    }*/
    return await this.db.save(newUser);
  }
}
