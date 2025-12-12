import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("tours")
export class Tour {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column("text")
  description: string;

  @Column()
  location: string;

  @Column()
  duration: string;

  @Column()
  price: number;

  @Column({ nullable: true })
  image: string;

  @Column("simple-array", { nullable: true })
  gallery: string[];

  @Column("json", { nullable: true })
  itinerary: {
    day: string;
    title: string;
    desc: string;
  }[];

  @Column({ type: "float", default: 0 })
  rating: number;

  @Column({ type: "int", default: 0 })
  discount: number;

  @Column({ type: "int", default: 0 })
  discountPrice: number;

  @Column({ type: "varchar", length: 50, nullable: true })
  dealType: string | null;

  @Column({ type: "datetime", nullable: true })
  dealStart: Date | null;

  @Column({ type: "datetime", nullable: true })
  dealEnd: Date | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
