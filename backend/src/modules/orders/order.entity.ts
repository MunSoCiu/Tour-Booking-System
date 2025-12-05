import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity("orders")
export class Order {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  code: string;

  @Column()
  userId: string;

  @Column("json")
  items: any; // [{tourId, qty, price}]

  @Column("int")
  total: number;

  @Column({ default: "pending" })
  status: string;

  @CreateDateColumn()
  createdAt: Date;
}
