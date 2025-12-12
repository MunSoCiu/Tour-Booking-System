import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from "@nestjs/common";
import { ToursService } from "../tours/tours.service";

@Controller("admin/tours")
export class AdminToursController {
  constructor(private svc: ToursService) {}

  @Get()
  async getTours() {
    const { items } = await this.svc.findAll({});
    return items;
  }

  @Post()
  create(@Body() body: any) {
    return this.svc.createAdminTour(body);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() body: any) {
    return this.svc.update(id, body);
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.svc.delete(id);
  }

  @Put(":id/deal")
  updateDeal(@Param("id") id: string, @Body() body: any) {
    return this.svc.updateDeal(id, body);
  }

  @Put(":id/deal/remove")
  removeDeal(@Param("id") id: string) {
    return this.svc.updateDeal(id, {
      dealType: null,
      discount: 0,
      discountPrice: 0,
      dealStart: null,
      dealEnd: null,
    });
  }
}
