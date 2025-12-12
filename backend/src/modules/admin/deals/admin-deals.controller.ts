import { Controller, Get, Put, Body, Param } from "@nestjs/common";
import { ToursService } from "../tours/tours.service";

@Controller("admin/deals")
export class AdminDealsController {
  constructor(private svc: ToursService) {}

  @Get()
  async getDeals() {
    return this.svc.getDeals();
  }

  @Put(":id")
  updateDeal(@Param("id") id: string, @Body() body: any) {
    return this.svc.updateDeal(id, body);
  }

  @Put(":id/remove")
  removeDeal(@Param("id") id: string) {
    return this.svc.updateDeal(id, {
      discount: 0,
      discountPrice: 0,
      dealType: null,
      dealStart: null,
      dealEnd: null,
    });
  }
}
