import {
  BeforeInsert,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  JoinTable,
  ManyToMany,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Length } from "class-validator";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import * as argon2 from "argon2";
import { Project } from "./project.entity";
import { UsersProjectsAccesses } from "./userProjectAccesses.entity";
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
    message: "Last name must be between 3 and 50 characters",
  })
  lastname: string;

  @Field()
  @Column({ length: 50 })
  @Length(3, 50, {
    message: "The first name must contain between 3 and 50 characters",
  })
  firstname: string;

  @Field()
  @Column({ unique: true, length: 20 })
  @Length(3, 20, {
    message: "The nickname must contain between 3 and 20 characters",
  })
  pseudo: string;

  @Field()
  @Column({ unique: true, length: 200 })
  @Length(5, 200, {
    message: "The email must contain between 5 and 200 characters",
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
  @UpdateDateColumn({
    name: "last_login",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  last_login: Date;

  @Field()
  @CreateDateColumn({ default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Field()
  @UpdateDateColumn({
    name: "updated_at",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  update_at: Date;

  @ManyToMany(() => Project, (project) => project.likedByUsers)
  @JoinTable({
    name: "users_projects_likes",
    joinColumn: { name: "user_id" },
    inverseJoinColumn: { name: "project_id" },
  })
  likedProjects: Project[];

  @OneToMany(
    () => UsersProjectsAccesses,
    (UsersProjectsAccesses) => UsersProjectsAccesses.user
  )
  usersProjectsAccesses: UsersProjectsAccesses[];
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
