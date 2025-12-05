import { Controller, Get, Query, Param, Post, Body } from "@nestjs/common";
import { ToursService } from "./tours.service";

@Controller("api/tours")
export class ToursController {
  constructor(private svc: ToursService) {}

  @Get()
  getAll(@Query() q: any) {
    return this.svc.findAll(q);
  }

  @Get(":id")
  getOne(@Param("id") id: string) {
    return this.svc.findOne(id);
  }

  @Post()
  create(@Body() body: Partial<any>) {
    return this.svc.create(body);
  }
}
