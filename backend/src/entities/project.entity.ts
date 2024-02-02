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
export class Project {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 100 })
  @Length(3, 100, { message: "Le nom du projet doit contenir entre 3 et 100 caractères" })
  name: string;

  @Field()
  @Column({ length: 50 })
  @Length(3, 50, { message: "La catégorie doit contenir entre 3 et 50 caractères" })
  category: string;
   
  @Field()
  @Column({ default: 0})
  private: boolean;

  @Field()
  @CreateDateColumn({default: () => "CURRENT_TIMESTAMP"})
  created_at: Date;

  @Field()
  @CreateDateColumn({default: () => "CURRENT_TIMESTAMP"})
  update_at: Date;

}