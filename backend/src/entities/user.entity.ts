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
  import { Field, Float, ID, InputType, ObjectType } from "type-graphql";
  
@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 50 })
  @Length(5, 50, { message: "Le titre doit contenir entre 5 et 50 caractères" })
  title: string;
}
  