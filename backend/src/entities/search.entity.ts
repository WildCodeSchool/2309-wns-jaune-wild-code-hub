import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { File } from "./file.entity";
import { User } from "./user.entity";
import { Project } from "./project.entity";
import { Field, ID, InputType } from "type-graphql";

@Entity()
export class Search {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  category: string;

  @Column()
  user: string;
}
