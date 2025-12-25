import {
  Controller,
  Get,
  Put,
  Param,
  Body,
  BadRequestException,
  ForbiddenException,
} from "@nestjs/common";
import { UsersService } from "@/modules/users/users.service";
import { AdminService } from "../admin.service";

@Controller("admin/users")
export class AdminUsersController {
  constructor(
    private usersService: UsersService,
    private adminService: AdminService
  ) {}

  @Get()
  findAll() {
    return this.usersService.adminFindAll();
  }

  @Get("stats")
  getStats() {
    return this.adminService.getUserStats();
  }

  @Put(":id/status")
  updateStatus(@Param("id") id: string, @Body() body: any) {
    return this.usersService.update(id, { status: body.status });
  }

  @Put(":id/role")
  async updateRole(@Param("id") id: string, @Body() body: any) {
    if (body.role !== "admin") {
      throw new BadRequestException("Invalid role change");
    }

    const user = await this.usersService.findEntityById(id);

    if (user.role === "admin") {
      throw new ForbiddenException("Cannot change admin role");
    }

    return this.usersService.update(id, { role: "admin" });
  }
}
