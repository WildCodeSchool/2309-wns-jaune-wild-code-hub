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
    message: " le nom du fichier doit contenir entre 1 et 100 caractères",
  })
  name: string;

  @Field()
  @Column()
  category: string;

  @Field()
  @Column()
  language: string;

  @Field()
  @Column()
  type: string;

  @Field()
  @Column()
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
  category: string;

  @Field()
  language: string;

  @Field()
  type: string;

  @Field({ nullable: true })
  content: string;

  @Field()
  created_at: Date;

  @Field()
  update_at: Date;
}
