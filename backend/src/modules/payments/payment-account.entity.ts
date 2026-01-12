// src/modules/payments/payment-account.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import { User } from "../users/user.entity";

@Entity("payment_accounts")
export class PaymentAccount {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "userId" })
  user: User;

  @Column()
  provider: string;
  // momo | vnpay | bank:vcb | bank:bidv | bank:tcb

  @Column()
  accountNumber: string;

  @Column()
  accountName: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: "decimal", precision: 15, scale: 0, default: 100000000 })
  balance: number;

  @CreateDateColumn()
  createdAt: Date;
}
