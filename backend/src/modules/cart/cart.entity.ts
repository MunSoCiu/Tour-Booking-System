import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";

// cart/cart.entity.ts
@Entity("cart_items")
export class CartItem {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  userId: string;

  @Column()
  tourId: string;

  @Column("int")
  qty: number;

  @Column({ default: false }) // ✅ CHECKBOX
  selected: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
