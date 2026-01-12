import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "../users/user.entity";
import { Order } from "../orders/order.entity";

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

  @Column({ type: "decimal", precision: 15, scale: 0 })
  amount: number;

  @Column()
  method: string; // momo | vnpay | bank:VCB | bank:TCB | bank:BIDV

  @Column({ default: "pending" })
  status: "pending" | "success" | "failed";

  @Column({ nullable: true })
  code: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  paidAt: Date;
}
