import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Notification } from "./notification.entity";

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private repo: Repository<Notification>
  ) {}

  create(payload: Partial<Notification>) {
    return this.repo.save(this.repo.create(payload));
  }

  findByUser(userId: string) {
    return this.repo.find({
      where: { userId },
      order: { createdAt: "DESC" },
    });
  }

  markRead(id: string, userId: string) {
    return this.repo.update({ id, userId }, { read: true });
  }

  markAllRead(userId: string) {
    return this.repo.update({ userId, read: false }, { read: true });
  }
}
