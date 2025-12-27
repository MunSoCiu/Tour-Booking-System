import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "../users/user.entity";

@Entity("orders")
export class Order {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  code: string;

  @ManyToOne(() => User, (user) => user.orders, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user: User;

  @Column()
  userId: string;

  // danh sách sản phẩm mua
  @Column("json")
  items: {
    tourId: string;
    tourTitle: string;
    tourImage: string;
    qty: number;
    price: number;
    discount: number;
    finalPrice: number;
  }[];

  @Column("int")
  total: number;

  @Column({ default: "pending" })
  status: "pending" | "success" | "cancelled";

  @CreateDateColumn()
  createdAt: Date;
}
