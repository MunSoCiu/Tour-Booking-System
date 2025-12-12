import { Controller, Get } from "@nestjs/common";
import { AdminService } from "./admin.service";

@Controller("admin")
export class AdminController {
  constructor(private readonly svc: AdminService) {}

  /* ===============================
        DASHBOARD MAIN STATS
  =============================== */
  @Get("stats")
  getStats() {
    return this.svc.getStats();
  }

  /* ===============================
        TOP SELLING TOURS
  =============================== */
  @Get("stats/top-tours")
  getTopTours() {
    return this.svc.getTopTours();
  }

  /* ===============================
        REVENUE CHART
  =============================== */
  @Get("stats/revenue-chart")
  getRevenueChart() {
    return this.svc.getRevenueChart();
  }
}
