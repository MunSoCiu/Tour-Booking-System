import { Controller, Get, Put, Body, Param } from "@nestjs/common";
import { ToursService } from "@/modules/tours/tours.service";
import { UpdateDealDto } from "@/modules/tours/dto/update-deal.dto";

@Controller("admin/deals")
export class AdminDealsController {
  constructor(private svc: ToursService) {}

  @Get()
  async getDeals() {
    return this.svc.getDeals();
  }

  @Put(":id")
  updateDeal(@Param("id") id: string, @Body() dto: UpdateDealDto) {
    return this.svc.updateDeal(id, dto);
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
