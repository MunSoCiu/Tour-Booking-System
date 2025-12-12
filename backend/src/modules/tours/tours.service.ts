import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Like } from "typeorm";
import { Tour } from "./tour.entity";

@Injectable()
export class ToursService {
  constructor(@InjectRepository(Tour) private repo: Repository<Tour>) {}

  // GET ALL + FILTER
  async findAll(q: any) {
    const page = Number(q.page) || 1;
    const limit = Number(q.limit) || 50;

    const where: any = {};

    if (q.search) {
      where.title = Like(`%${q.search}%`);
    }

    if (q.location) {
      where.location = Like(`%${q.location}%`);
    }

    // FILTER DAYS → example: 3 = match "3N%"
    if (q?.days) {
      const day = Number(q.days);

      where.duration = Like(`${day}N%`);
    }

    if (q.dealType) {
      where.dealType = q.dealType;
    }

    const [items, total] = await this.repo.findAndCount({
      where,
      order: { createdAt: "DESC" },
      take: limit,
      skip: (page - 1) * limit,
    });

    return { items, total, page, limit };
  }

  // GET DAYS LIST
  async getDaysList() {
    const tours = await this.repo.find();
    const days = new Set<number>();

    tours.forEach((t) => {
      const match = t.duration.match(/^(\d+)N/);
      if (match) days.add(Number(match[1]));
    });

    return Array.from(days).sort((a, b) => a - b);
  }

  // GET ONE BY SLUG
  findBySlug(slug: string) {
    return this.repo.findOne({ where: { slug } });
  }

  async createAdminTour(data: any) {
    const tour = this.repo.create({
      title: data.title,
      slug: data.title.toLowerCase().replace(/\s+/g, "-"),
      price: data.price,
      image: data.image,
      description: data.description ?? "",
      location: data.location ?? "",
      duration: data.duration ?? "1N",
    });

    return this.repo.save(tour);
  }

  async update(id: string, data: any) {
    await this.repo.update(id, data);
    return this.repo.findOne({ where: { id } });
  }

  async updateDeal(id: string, data: any) {
    await this.repo.update(id, data);
    return this.repo.findOne({ where: { id } });
  }

  delete(id: string) {
    return this.repo.delete(id);
  }

  // GET DEALS
  async getDeals() {
    return this.repo.find({
      where: [
        { dealType: "flash-sale" },
        { dealType: "seasonal" },
        { dealType: "last-minute" },
      ],
      order: { createdAt: "DESC" },
    });
  }
}
