import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  JoinTable,
  ManyToMany,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm";
import { Length } from "class-validator";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import { Project } from "./project.entity";

@ObjectType()
@Entity()
export class File {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Project, (project) => project.files)
  @JoinColumn({ name: "project_id" })
  project: Project;

  @Field()
  @Column({ length: 100 })
  @Length(1, 100, {
    message: " le nom du fichier doit contenir entre 1 et 100 caractères ",
  })
  name: string;
  
 @Field()
  @Column({ length: 50 })
  @Length(1, 50, {
    message: "Language must have between 1 to 50 characters",
  })
  language: string;
  @Field()
  @Column()
  category: string;

 

  @Field()
  @Column({ length: 50 })
  @Length(1, 50, { message: "Type must have between 1 to 50 characters" })
  type: string;

  @Field()
  @Column()
  content: string;

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
}

@InputType()
export class CreateFileInput {
  @Field()
  project_id: number;

  @Field()
  name: string;

  @Field()
  language: string;

  @Field()
  type: string;

  @Field({ nullable: true })
  content: string;

  @Field({ nullable: true })
  category: string;
}

@InputType()
export class UpdateFileInput {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  language: string;

  @Field()
  type: string;

  @Field({ nullable: true })
  content: string;
}
