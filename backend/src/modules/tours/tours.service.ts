import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Like } from "typeorm";
import { Tour } from "./tour.entity";

@Injectable()
export class ToursService {
  constructor(@InjectRepository(Tour) private repo: Repository<Tour>) {}

  async findAll(q?: any) {
    // q: { search, minPrice, maxPrice, location, page, limit }
    const page = +(q?.page || 1);
    const limit = +(q?.limit || 12);
    const where: any = {};
    if (q?.search) where.title = Like(`%${q.search}%`);
    if (q?.location) where.location = q.location;
    const [items, total] = await this.repo.findAndCount({
      where,
      take: limit,
      skip: (page - 1) * limit,
      order: { createdAt: "DESC" },
    });
    return { items, total, page, limit };
  }

  findOne(id: string) {
    return this.repo.findOneBy({ id });
  }

  create(payload: Partial<Tour>) {
    const t = this.repo.create(payload);
    return this.repo.save(t);
  }

  update(id: string, payload: Partial<Tour>) {
    return this.repo.update(id, payload);
  }

  remove(id: string) {
    return this.repo.delete(id);
  }
}
