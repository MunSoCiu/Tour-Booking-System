import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity("tours")
export class Tour {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  slug: string;

  @Column("text", { nullable: true })
  description: string;

  @Column({ nullable: true })
  location: string;

  @Column("int", { default: 0 })
  price: number;

  @Column({ nullable: true })
  duration: string;

  @Column({ nullable: true })
  image: string;

  @CreateDateColumn()
  createdAt: Date;
}
