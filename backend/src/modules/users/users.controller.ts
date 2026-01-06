import {
  Controller,
  Get,
  Param,
  Put,
  Body,
  UseGuards,
  ForbiddenException,
  Req,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { JwtAuthGuard } from "../auth/jwt.guard";
import { User } from "./user.entity";
import { RequestWithUser } from "@/common/types/request-with-user";

@Controller("users")
export class UsersController {
  constructor(private svc: UsersService) {}

  /** ONLY ADMIN CAN VIEW ALL USERS */
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(@Body("role") role: string) {
    if (role !== "admin") {
      throw new ForbiddenException(
        "Bạn không có quyền xem danh sách người dùng"
      );
    }
    return this.svc.findAll();
  }

  /** USER OR ADMIN CAN VIEW PROFILE */
  @UseGuards(JwtAuthGuard)
  @Get(":id")
  async getOne(
    @Param("id") id: string,
    @Body("userId") userId: string,
    @Body("role") role: string
  ) {
    if (userId !== id && role !== "admin") {
      throw new ForbiddenException("Không thể xem thông tin người khác");
    }
    return this.svc.findById(id);
  }

  /** USER CAN UPDATE ONLY THEIR OWN PROFILE — ADMIN CAN UPDATE ANYONE */
  @UseGuards(JwtAuthGuard)
  @Put(":id")
  async update(
    @Req() req: RequestWithUser,
    @Param("id") id: string,
    @Body() body: Partial<User>
  ) {
    const { sub: userId, role } = req.user;

    if (body.role && role !== "admin") {
      throw new ForbiddenException("Không thể thay đổi quyền");
    }

    if (userId !== id && role !== "admin") {
      throw new ForbiddenException("Không có quyền cập nhật");
    }

    return this.svc.update(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Put(":id/password")
  async changePassword(
    @Req() req: RequestWithUser,
    @Param("id") id: string,
    @Body() body: { oldPassword: string; newPassword: string }
  ) {
    if (req.user.sub !== id) {
      throw new ForbiddenException("Không có quyền");
    }

    return this.svc.changePassword(id, body.oldPassword, body.newPassword);
  }
}
