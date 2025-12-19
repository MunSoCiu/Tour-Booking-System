import { Controller, Get, Put, Param, Body } from "@nestjs/common";
import { UsersService } from "@/modules/users/users.service";

@Controller("admin/users")
export class AdminUsersController {
  constructor(private svc: UsersService) {}

  @Get()
  findAll() {
    return this.svc.findAll();
  }

  @Put(":id/status")
  updateStatus(@Param("id") id: string, @Body() body: any) {
    return this.svc.update(id, { status: body.status });
  }

  @Put(":id/role")
  updateRole(@Param("id") id: string, @Body() body: any) {
    return this.svc.update(id, { role: body.role });
  }
}
