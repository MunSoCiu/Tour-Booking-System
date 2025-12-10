import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  /* ===================================
            GET ALL USERS
  =================================== */
  async findAll() {
    const users = await this.repo.find();
    return users.map(({ password, ...rest }) => rest);
  }

  /* ===================================
            FIND BY ID
  =================================== */
  async findById(id: string) {
    const user = await this.repo.findOneBy({ id });
    if (!user) return null;
    const { password, ...safe } = user;
    return safe;
  }

  /* ===================================
            FIND BY EMAIL
  =================================== */
  findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  /* ===================================
            CREATE USER
  =================================== */
  async create(payload: Partial<User>) {
    // Auto-set role if missing
    if (!payload.role) payload.role = "user";

    const user = this.repo.create(payload);
    return this.repo.save(user);
  }

  /* ===================================
            UPDATE USER
  =================================== */
  async update(id: string, payload: Partial<User>) {
    const user = await this.findById(id);

    // Nếu cập nhật mật khẩu → hash lại
    if (payload.password) {
      payload.password = await bcrypt.hash(payload.password, 10);
    }

    Object.assign(user, payload);
    return this.repo.save(user);
  }
}
