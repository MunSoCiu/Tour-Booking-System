import {
  Controller,
  Get,
  Param,
  Put,
  Body,
  UseGuards,
  ForbiddenException,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { JwtAuthGuard } from "../auth/jwt.guard";

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
    @Param("id") id: string,
    @Body() body: Partial<any>,
    @Body("userId") userId: string,
    @Body("role") role: string
  ) {
    // ❌ User cannot self-promote to admin
    if (body.role && role !== "admin") {
      throw new ForbiddenException("Không thể thay đổi quyền của bạn");
    }

    // ❌ User cannot update another user's profile
    if (userId !== id && role !== "admin") {
      throw new ForbiddenException("Bạn không có quyền cập nhật người khác");
    }

    return this.svc.update(id, body);
  }
}
