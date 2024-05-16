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
  PrimaryColumn,
} from "typeorm";
import { Length, Min } from "class-validator";
import { Field, Float, ID, InputType, ObjectType } from "type-graphql";
import * as argon2 from "argon2";
import { Project } from "./project.entity";
import { User } from "./user.entity";
export type ROLE = "editor" | "viewer";

@ObjectType()
@Entity({ name: 'users_projects_access' })
export class UserProjectAccess {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  projectId: number;

  @ManyToOne(() => User, user => user.projectsAccess)
  user: User;

  @ManyToOne(() => Project, project => project.usersAccess)
  project: Project;

  @Column({
    type: 'enum',
    enum: ['editor', 'viewer'],
    default: 'viewer'
  })
  role: 'editor' | 'viewer';

  @CreateDateColumn({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}