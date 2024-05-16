import {
  BeforeInsert,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  JoinTable,
  ManyToMany,
  UpdateDateColumn,
} from "typeorm";
import { Length, Min } from "class-validator";
import { Field, Float, ID, InputType, ObjectType } from "type-graphql";
import * as argon2 from "argon2";
import { Project } from "./project.entity";
export type ROLE = "ADMIN" | "USER";

@ObjectType()
@Entity()
export class User {
  @BeforeInsert()
  protected async hashPassword() {
    this.password = await argon2.hash(this.password);
  }

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 50 })
  @Length(3, 50, {
    message: "Le nom de famille doit contenir entre 3 et 50 caractères",
  })
  lastname: string;

  @Field()
  @Column({ length: 50 })
  @Length(3, 50, {
    message: "Le prénom doit contenir entre 3 et 50 caractères",
  })
  firstname: string;

  @Field()
  @Column({ unique: true, length: 20 })
  @Length(3, 20, {
    message: "Le pseudo doit contenir entre 3 et 20 caractères",
  })
  pseudo: string;

  @Field()
  @Column({ unique: true, length: 200 })
  @Length(5, 200, {
    message: "L'email doit contenir entre 5 et 200 caractères",
  })
  email: string;

  @Field()
  @Column({ length: 255 })
  password: string;

  @Field()
  @Column({
    type: "text",
    enum: ["ADMIN", "USER"],
    nullable: true,
    default: "USER",
  })
  role: ROLE;

  @Field()
  @Column({ default: 0 })
  ban: boolean;

  @Field()
  @Column({ default: 1 })
  run_counter: number;

  @Field()
  @UpdateDateColumn({ name: 'updated_at', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  last_login: Date;

  @Field()
  @CreateDateColumn({ default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  update_at: Date;

  @ManyToMany(() => Project)
  @JoinTable({ name: "users_projects_likes" })
  projects: Project[];

  @ManyToMany(() => Project, project => project.usersAccess)
  @JoinTable()
  projectsAccess: Project[];
}


@InputType()
export class CreateUserInput {
  @Field()
  lastname: string;

  @Field()
  firstname: string;

  @Field()
  pseudo: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  ban: boolean;

  @Field({ nullable: true })
  role: ROLE;

  @Field()
  run_counter: number;
}

@InputType()
export class UpdateUserInput {

  @Field(() => ID)
  id: number;

  @Field({ nullable: true })
  lastname: string;

  @Field({ nullable: true })
  firstname: string;

  @Field({ nullable: true })
  pseudo: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  password: string;

  @Field({ nullable: true })
  ban: boolean;

  @Field({ nullable: true })
  role: ROLE;

  @Field({ nullable: true })
  run_counter: number;
}

@InputType()
export class InputLogin {
  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  pseudo: string;

  @Field()
  password: string;
}

@ObjectType()
export class Message {
  @Field()
  success: boolean;

  @Field()
  message: string;
}
