import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
<<<<<<< HEAD
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "@/modules/users/user.entity";
import { Order } from "@/modules/orders/order.entity";

@Entity("payments")
export class Payments {
=======
} from "typeorm";

@Entity("payments")
export class Payment {
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  orderId: string;

  @Column()
  userId: string;

<<<<<<< HEAD
  @ManyToOne(() => User)
  @JoinColumn({ name: "userId" })
  user: User;

  @ManyToOne(() => Order)
  @JoinColumn({ name: "orderId" })
  order: Order;

=======
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0
  @Column("int")
  amount: number;

  @Column()
<<<<<<< HEAD
  method: string; // momo | vnpay | bank
=======
  method: string;
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0

  @Column({ default: "pending" })
  status: string;

  @CreateDateColumn()
  createdAt: Date;
}
