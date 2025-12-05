import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity("testimonials")
export class Testimonial {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  role: string;

  @Column("int", { default: 5 })
  rating: number;

  @Column("text")
  text: string;

  @Column({ nullable: true })
  tourName: string;

  @CreateDateColumn()
  createdAt: Date;
}
