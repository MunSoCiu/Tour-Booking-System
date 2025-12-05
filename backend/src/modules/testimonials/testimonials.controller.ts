import { Controller, Get, Post, Body } from "@nestjs/common";
import { TestimonialsService } from "./testimonials.service";

@Controller("api/testimonials")
export class TestimonialsController {
  constructor(private svc: TestimonialsService) {}

  @Get()
  list() {
    return this.svc.findAll();
  }

  @Post()
  create(@Body() body: any) {
    return this.svc.create(body);
  }
}
