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

type ROLE = "ADMIN" | "USER";

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 50 })
  @Length(3, 50, {
    message: "Le nom de famille doit contenir entre 3 et 50 caractères",
  })
  lastname: string;

  @Field()
  @Column({ length: 50 })
  @Length(3, 50, {
    message: "Le prénom doit contenir entre 3 et 50 caractères",
  })
  firstname: string;

  @Field()
  @Column({ length: 20 })
  @Length(3, 20, {
    message: "Le pseudo doit contenir entre 3 et 20 caractères",
  })
  pseudo: string;

  @Field()
  @Column({ length: 200 })
  @Length(5, 200, {
    message: "L'email doit contenir entre 5 et 200 caractères",
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
  @CreateDateColumn({ default: () => "CURRENT_TIMESTAMP" })
  last_login: Date;

  @Field()
  @CreateDateColumn({ default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Field()
  @CreateDateColumn({ default: () => "CURRENT_TIMESTAMP" })
  update_at: Date;
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
}
