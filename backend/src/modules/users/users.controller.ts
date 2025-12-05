import { Controller, Get, Param, Put, Body } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller("api/users")
export class UsersController {
  constructor(private svc: UsersService) {}

  @Get()
  getAll() {
    return this.svc.findAll();
  }

  @Get(":id")
  getOne(@Param("id") id: string) {
    return this.svc.findById(id);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() body: Partial<any>) {
    return this.svc.update(id, body);
  }
}
