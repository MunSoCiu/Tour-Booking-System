import { Controller, Get, Query, Param } from "@nestjs/common";
import { ToursService } from "./tours.service";

@Controller("api/tours")
export class ToursController {
  constructor(private svc: ToursService) {}

  // GET ALL
  @Get()
  getAll(@Query() q: any) {
    return this.svc.findAll(q);
  }

  // GET DAYS LIST
  @Get("days/list")
  getDays() {
    return this.svc.getDaysList();
  }

  // GET ONE
  @Get(":id")
  getOne(@Param("id") id: string) {
    return this.svc.findOne(id);
  }
}
