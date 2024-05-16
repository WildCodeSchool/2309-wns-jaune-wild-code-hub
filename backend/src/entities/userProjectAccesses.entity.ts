import { Entity, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';
import { Project } from './project.entity';

export enum UserRole {
  EDITOR = "EDITOR",
  VIEWER = "VIEWER",
}

@Entity()
export class UsersProjectsAccesses {
  @PrimaryColumn()
  user_id: number;

  @PrimaryColumn()
  project_id: number;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.VIEWER
  })
  role: UserRole;

  @CreateDateColumn({ default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ManyToOne(() => User, user => user.usersProjectsAccesses)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Project, project => project.usersProjectsAccesses)
  @JoinColumn({ name: 'project_id' })
  project: Project;
}