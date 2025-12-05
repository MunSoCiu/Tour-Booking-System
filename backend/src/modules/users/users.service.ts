import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  findAll() {
    return this.repo.find();
  }

  findById(id: string) {
    return this.repo.findOneBy({ id });
  }

  findByEmail(email: string) {
    return this.repo.findOneBy({ email });
  }

  update(id: string, payload: Partial<User>) {
    return this.repo.update(id, payload);
  }

  create(payload: Partial<User>) {
    const u = this.repo.create(payload);
    return this.repo.save(u);
  }
}
