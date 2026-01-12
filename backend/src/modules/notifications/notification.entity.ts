import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity("notifications")
export class Notification {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  userId: string;

  @Column()
  title: string;

  @Column("text")
  message: string;

  @Column({ default: false })
  read: boolean;

  @Column({ nullable: true })
  link: string;

  @Column({ nullable: true })
  type: string;

  @CreateDateColumn()
  createdAt: Date;
}
