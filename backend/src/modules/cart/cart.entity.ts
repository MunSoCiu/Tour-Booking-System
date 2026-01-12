import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { Tour } from "../tours/tour.entity";

// cart/cart.entity.ts
@Entity("cart_items")
export class CartItem {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  userId: string;

  @Column()
  tourId: string;

  @ManyToOne(() => Tour, { eager: false })
  tour: Tour;

  @Column("int")
  qty: number;

  @Column({ type: "date", nullable: true })
  date: string | null;

  @Column({ default: false })
  selected: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
