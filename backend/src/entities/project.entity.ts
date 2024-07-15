import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  JoinTable,
  ManyToMany,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Length, Min } from "class-validator";
import { Field, Float, ID, InputType, ObjectType } from "type-graphql";
import { User } from "./user.entity";
import { UsersProjectsAccesses } from "./userProjectAccesses.entity";
import { File } from "./file.entity";

@ObjectType()
@Entity()
export class Project {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true, length: 100 })
  @Length(3, 100, {
    message: "Le nom du projet doit contenir entre 3 et 100 caractères",
  })
  name: string;

  @Field()
  @Column({ length: 50 })
  @Length(3, 50, {
    message: "La catégorie doit contenir entre 3 et 50 caractères",
  })
  category: string;

  @Field()
  @Column({ default: 0 })
  private: boolean;

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

  @ManyToMany(() => User, (user) => user.likedProjects)
  @JoinTable({
    name: "users_projects_likes",
    joinColumn: { name: "project_id" },
    inverseJoinColumn: { name: "user_id" },
  })
  likedByUsers: User[];

  @OneToMany(
    () => UsersProjectsAccesses,
    (UsersProjectsAccesses) => UsersProjectsAccesses.project
  )
  usersProjectsAccesses: UsersProjectsAccesses[];

  @OneToMany(() => File, (file) => file.project)
  files: File[];

  @ManyToOne(() => User, (user) => user.projects)
  @JoinColumn({ name: "user_id" })
  user: User;
}

@InputType()
export class CreateProjectInput {
  @Field()
  name: string;

  @Field()
  category: string;

  @Field()
  private: boolean;
}

@InputType()
export class UpdateProjectInput {
  @Field(() => ID)
  id: number;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  category: string;

  @Field({ nullable: true })
  private: boolean;
}
