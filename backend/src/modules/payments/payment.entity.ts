import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "@/modules/users/user.entity";
import { Order } from "@/modules/orders/order.entity";

@Entity("payments")
export class Payments {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  orderId: string;

  @Column()
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "userId" })
  user: User;

  @ManyToOne(() => Order)
  @JoinColumn({ name: "orderId" })
  order: Order;

  @Column("int")
  amount: number;

  @Column()
  method: string; // momo | vnpay | bank

  @Column({ default: "pending" })
  status: string;

  @CreateDateColumn()
  createdAt: Date;
}
