import { Entity, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';
import { Project } from './project.entity';
import { Field, ID, InputType, ObjectType } from "type-graphql";

export enum UserRole {
  OWNER = "OWNER",
  EDITOR = "EDITOR",
  VIEWER = "VIEWER",
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
    default: UserRole.VIEWER
  })
  role: UserRole;

  @CreateDateColumn({ default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ManyToOne(() => User, user => user.usersProjectsAccesses)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Project, project => project.usersProjectsAccesses)
  @JoinColumn({ name: 'project_id' })
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
export class UpdateUserProjectAccessesInput {
  @Field()
  user_id: number;

  @Field()
  project_id: number;

  @Field({ nullable: true })
  role: UserRole;
}

@ObjectType()
export class UserAccessProjectOutput {
  @Field({ nullable: false })
  role: UserRole;

  @Field(() => Project, { nullable: true })
  project: Project;
}