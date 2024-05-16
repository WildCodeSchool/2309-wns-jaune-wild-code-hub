import {
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
import { Field, ID, InputType, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class File {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  project_id: string;

  @Field()
  @Column({ length: 100 })
  @Length(1, 100, {
    message: " le nom du fichier doit contenir entre 1 et 100 caractères ",
  })
  name: string;

  @Field()
  @Column()
  category: string;

  @Field()
  @Column()
  language: string;

  @Field()
  @Column({ nullable: true })
  type: string;

  @Field()
  @Column({ nullable: true })
  content: string;

  @Field()
  @CreateDateColumn({ default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Field()
  @CreateDateColumn({ default: () => "CURRENT_TIMESTAMP" })
  update_at: Date;
}

@InputType()
export class CreateFileInput {
  @Field()
  project_id: string;

  @Field()
  name: string;

  @Field()
  language: string;

  @Field()
  type: string;

  @Field({ nullable: true })
  content: string;
}

@InputType()
export class UpdateFile {
  @Field()
  project_id: string;

  @Field()
  name: string;

  @Field()
  language: string;

  @Field()
  type: string;

  @Field({ nullable: true })
  content: string;
}

@InputType()
export class DeleteFile {
  @Field()
  project_id: string;

  @Field()
  name: string;

  @Field()
  language: string;

  @Field()
  type: string;

  @Field({ nullable: true })
  content: string;
}
