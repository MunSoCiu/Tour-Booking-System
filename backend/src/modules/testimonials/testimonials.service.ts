import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Testimonial } from "./testimonial.entity";

@Injectable()
export class TestimonialsService {
  constructor(
    @InjectRepository(Testimonial) private repo: Repository<Testimonial>
  ) {}

  findAll() {
    return this.repo.find({ order: { createdAt: "DESC" } });
  }

  create(payload: Partial<Testimonial>) {
    const t = this.repo.create(payload);
    return this.repo.save(t);
  }
}
