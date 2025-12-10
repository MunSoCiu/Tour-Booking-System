import { Controller, Get } from "@nestjs/common";
import { AdminService } from "./admin.service";

@Controller("admin/stats")
export class AdminController {
  constructor(private svc: AdminService) {}

  @Get()
  getStats() {
    return this.svc.getStats();
  }

  @Get("top-tours")
  getTopTours() {
    return this.svc.getTopTours();
  }

  @Get("revenue-chart")
  getRevenueChart() {
    return this.svc.getRevenueChart();
  }
}
