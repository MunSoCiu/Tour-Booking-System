import { Controller, Get, Query, Param } from "@nestjs/common";
import { ToursService } from "./tours.service";

@Controller("tours")
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

  // GET ONE BY SLUG
  @Get("slug/:slug")
  getBySlug(@Param("slug") slug: string) {
    return this.svc.findBySlug(slug);
  }
}
