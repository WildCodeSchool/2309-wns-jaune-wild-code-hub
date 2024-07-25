import {
  AfterInsert,
  AfterUpdate,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";
import { Field, ObjectType } from "type-graphql";
import Mailer from "../lib/mailer";
import { uuid } from "uuidv4";

@ObjectType()
@Entity()
export default class Reset {
  @AfterInsert()
  @AfterUpdate()
  async sendTokenByMail() {
    // this.resetToken = uuid();
    const mailer = new Mailer(
      undefined,
      this.user.email,
      "Réinitialisation de mot de passe",
      process.env.SENDGRID_TEMPLATE_RESET!,
      {
        resetLink: `${process.env.FRONT_LINK!}/auth/reset/${this.resetToken}`,
      }
    );
    await mailer.send();
  }

  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  resetToken: string;

  @Field(() => User)
  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Field()
  @Column({ type: "datetime" })
  expirationDate: Date;
}
