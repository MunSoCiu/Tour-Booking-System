import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  fullName: string;

  @Column({ nullable: true })
  phone: string;

  @Column({
    type: "varchar",
    default: "user",
  })
  role: "user" | "admin";

  @Column({ default: "active" })
  status: "active" | "banned";

  @CreateDateColumn()
  createdAt: Date;
}
