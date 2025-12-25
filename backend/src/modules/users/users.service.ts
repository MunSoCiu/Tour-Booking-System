import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UnauthorizedException, BadRequestException } from "@nestjs/common";

import { Repository } from "typeorm";
import { User } from "./user.entity";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  /* ======================
        INTERNAL HELPERS
  ====================== */
  private sanitize(user: User) {
    const { password, ...safe } = user;
    return safe;
  }

  /* ======================
        PUBLIC — GET ALL
  ====================== */
  async findAll() {
    const users = await this.repo.find();
    return users.map((u) => this.sanitize(u));
  }

  /* ======================
        ADMIN — GET ALL
  ====================== */
  async adminFindAll() {
    const items = await this.repo.find({
      order: { createdAt: "DESC" },
      select: [
        "id",
        "email",
        "fullName",
        "avatar",
        "role",
        "status",
        "createdAt",
      ],
    });

    return {
      items,
      total: items.length,
    };
  }

  /* ======================
        FIND ENTITY BY ID
  ====================== */
  async findEntityById(id: string) {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) throw new NotFoundException("User not found");
    return user;
  }

  /* ======================
        FIND SAFE BY ID
  ====================== */
  async findById(id: string) {
    const user = await this.findEntityById(id);
    return this.sanitize(user);
  }

  /* ======================
        FIND BY EMAIL
  ====================== */
  async findEntityByEmail(email: string): Promise<User | null> {
    return this.repo.findOne({ where: { email } });
  }
  async findByEmail(email: string) {
    const user = await this.repo.findOne({ where: { email } });
    if (!user) return null;
    return this.sanitize(user);
  }

  /* ======================
   CREATE — INTERNAL (FULL ENTITY)
====================== */
  async createEntity(payload: Partial<User>): Promise<User> {
    if (!payload.role) payload.role = "user";

    if (payload.password) {
      payload.password = await bcrypt.hash(payload.password, 10);
    }

    const user = this.repo.create(payload);
    return this.repo.save(user);
  }

  /* ======================
   CREATE — PUBLIC (SAFE)
====================== */
  async create(payload: Partial<User>) {
    const user = await this.createEntity(payload);
    return this.sanitize(user);
  }

  /* ======================
        UPDATE USER
  ====================== */
  async update(id: string, payload: Partial<User>) {
    const user = await this.findEntityById(id);

    if (payload.password) {
      payload.password = await bcrypt.hash(payload.password, 10);
    }

    Object.assign(user, payload);
    const saved = await this.repo.save(user);

    return this.sanitize(saved);
  }

  async changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string
  ) {
    const user = await this.repo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException("User not found");

    const ok = await bcrypt.compare(oldPassword, user.password);
    if (!ok) throw new BadRequestException("Mật khẩu cũ không đúng");

    user.password = await bcrypt.hash(newPassword, 10);
    return this.repo.save(user);
  }
}
