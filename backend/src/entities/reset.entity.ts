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
      "Reset du password",
      process.env.SENDGRID_TEMPLATE_RESET!,
      {
        resetLink: `${process.env.FRONT_LINK!}/auth/Reset/${this.resetToken}`,
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
  @Column("timestamp")
  expirationDate: Date;
}
