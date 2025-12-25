import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Payment } from "./payment.entity";

@Injectable()
export class PaymentsService {
  constructor(@InjectRepository(Payment) private repo: Repository<Payment>) {}

  create(payload: Partial<Payment>) {
    const p = this.repo.create(payload);
    return this.repo.save(p);
  }

  findByUser(userId: string) {
    return this.repo.findBy({ userId });
  }

  updateStatus(id: string, status: string) {
    return this.repo.update(id, { status });
  }
}
