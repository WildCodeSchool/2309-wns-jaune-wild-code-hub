import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
} from "typeorm";
import { User, Message } from "./user.entity";
import { Project } from "./project.entity";
import { Field, InputType, ObjectType } from "type-graphql";

export enum UserRole {
  EDITOR = "EDITOR",
  VIEWER = "VIEWER",
  OWNER = "OWNER",
}

@Entity()
export class UsersProjectsAccesses {
  @PrimaryColumn()
  user_id: number;

  @PrimaryColumn()
  project_id: number;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.OWNER,
  })
  role: UserRole;

  @CreateDateColumn({ default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @UpdateDateColumn({
    name: "updated_at",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.usersProjectsAccesses)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Project, (project) => project.usersProjectsAccesses)
  @JoinColumn({ name: "project_id" })
  project: Project;
}

@InputType()
export class CreateUserProjectAccessesInput {
  @Field()
  user_id: number;

  @Field()
  project_id: number;

  @Field({ nullable: true })
  role: UserRole;
}

@InputType()
export class DeleteUserProjectAccessesInput {
  @Field()
  user_id: number;

  @Field()
  project_id: number;
}

@InputType()
export class UpdateUserProjectAccessesInput {
  @Field()
  user_id: number;

  @Field()
  project_id: number;

  @Field({ nullable: true })
  role: UserRole;
}

@ObjectType()
export class FindAllInfoUserAccessesProject {
  @Field({ nullable: false })
  user_id: number;

  @Field({ nullable: false })
  project_id: number;

  @Field({ nullable: false })
  role: UserRole;

  @Field({ nullable: false })
  created_at: Date;

  @Field({ nullable: false })
  updated_at:Date;

  @Field(() => User, { nullable: true })
  user: User;

  @Field(() => Project, { nullable: true })
  project: Project;
}

@ObjectType()
export class UserAccessProjectResponse {

  @Field(() => [FindAllInfoUserAccessesProject], { nullable: false })
  listUsersAccessesProjectData : [FindAllInfoUserAccessesProject];

  @Field(() => Message, { nullable: true })
  message: Message;

}

@ObjectType()
export class UserAccessProjectOutput {
  @Field({ nullable: false })
  role: UserRole;

  @Field(() => Project, { nullable: false })
  project: Project;
}
