import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from "typeorm";

import { Order } from "../orders/order.entity";

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

  @Column({ nullable: true })
  avatar: string;

  @Column({
    type: "varchar",
    default: "user",
  })
  role: "user" | "admin";

  @Column({ default: "active" })
  status: "active" | "banned";

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @Column({ type: "date", nullable: true })
  birthDate?: Date;

  @Column({ nullable: true })
  address?: string;
}
