import { Controller, Get, Patch, Param, UseGuards, Req } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt.guard";
import { NotificationsService } from "./notifications.service";
import { RequestWithUser } from "@/common/types/request-with-user";

@Controller("notifications")
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(private svc: NotificationsService) {}

  @Get()
  myNotifications(@Req() req: RequestWithUser) {
    return this.svc.findByUser(req.user.sub);
  }

  @Patch(":id/read")
  markRead(@Param("id") id: string, @Req() req: RequestWithUser) {
    return this.svc.markRead(id, req.user.sub);
  }

  @Patch("read-all")
  markAllRead(@Req() req: RequestWithUser) {
    return this.svc.markAllRead(req.user.sub);
  }
}
