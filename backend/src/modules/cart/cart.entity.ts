import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

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

  @CreateDateColumn()
  createdAt: Date;
}
