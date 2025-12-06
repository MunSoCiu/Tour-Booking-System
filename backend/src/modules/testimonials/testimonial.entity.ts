import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Testimonial {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  role: string;

  @Column({ type: "int", default: 5 })
  rating: number;

  @Column({ type: "text" })
  text: string;

  @Column({ nullable: true })
  avatar: string;

  @Column()
  tourName: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;
}
