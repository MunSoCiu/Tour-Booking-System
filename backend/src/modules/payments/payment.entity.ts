import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity("payments")
export class Payment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  orderId: string;

  @Column()
  userId: string;

  @Column("int")
  amount: number;

  @Column()
  method: string;

  @Column({ default: "pending" })
  status: string;

  @CreateDateColumn()
  createdAt: Date;
}
