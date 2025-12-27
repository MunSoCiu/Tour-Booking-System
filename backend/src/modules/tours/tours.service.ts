import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Like, IsNull, Not } from "typeorm";
import { Tour } from "./tour.entity";
import { CreateTourDto } from "@/modules/tours/dto/create-tour.dto";

@Injectable()
export class ToursService {
  constructor(@InjectRepository(Tour) private repo: Repository<Tour>) {}

  /* =========================
        GET ALL + FILTER
  ========================= */
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

    // FILTER DAYS → example: 3 = "3N%"
    if (q.days) {
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

  /* =========================
        GET DAYS LIST
  ========================= */
  async getDaysList() {
    const tours = await this.repo.find();
    const days = new Set<number>();

    tours.forEach((t) => {
      const match = t.duration?.match(/^(\d+)N/);
      if (match) days.add(Number(match[1]));
    });

    return Array.from(days).sort((a, b) => a - b);
  }

  /* =========================
        GET BY SLUG
  ========================= */
  findBySlug(slug: string) {
    return this.repo.findOne({ where: { slug } });
  }

  /* =========================
        ADMIN CREATE TOUR
  ========================= */
  async createAdminTour(dto: CreateTourDto) {
    const tour = this.repo.create({
      title: dto.title,
      slug: dto.slug || dto.title.toLowerCase().replace(/\s+/g, "-"),
      price: dto.price,
      image: dto.image || null,
      description: dto.description || "Đang cập nhật",
      location: dto.location || "Đang cập nhật",
      duration: dto.duration || "1N",
      itinerary: dto.itinerary || [],
    });

    return this.repo.save(tour);
  }

  /* =========================
        UPDATE TOUR
  ========================= */
  async update(id: string, data: any) {
    const tour = await this.repo.findOne({ where: { id } });
    if (!tour) throw new NotFoundException("Tour not found");

    Object.assign(tour, data);
    return this.repo.save(tour);
  }

  /* =========================
        UPDATE / ADD DEAL
  ========================= */
  async updateDeal(id: string, data: any) {
    const tour = await this.repo.findOne({ where: { id } });
    if (!tour) throw new NotFoundException("Tour not found");

    Object.assign(tour, data);
    return this.repo.save(tour);
  }

  /* =========================
        REMOVE DEAL (QUAN TRỌNG)
  ========================= */
  async removeDeal(id: string) {
    const tour = await this.repo.findOne({ where: { id } });
    if (!tour) throw new NotFoundException("Tour not found");

    tour.dealType = null;
    tour.discount = 0;
    tour.discountPrice = 0;
    tour.dealStart = null;
    tour.dealEnd = null;

    return this.repo.save(tour);
  }

  /* =========================
        DELETE TOUR
  ========================= */
  async delete(id: string) {
    const tour = await this.repo.findOne({ where: { id } });
    if (!tour) throw new NotFoundException("Tour not found");

    await this.repo.delete(id);
    return { message: "Tour deleted successfully" };
  }

  /* =========================
        GET DEALS ONLY
  ========================= */
  async getDeals() {
    return this.repo.find({
      where: { dealType: Not(IsNull()) },
      order: { createdAt: "DESC" },
    });
  }
}
