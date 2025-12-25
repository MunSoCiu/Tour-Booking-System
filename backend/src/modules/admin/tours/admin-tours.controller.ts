import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from "@nestjs/common";
import { ToursService } from "@/modules/tours/tours.service";
import { UpdateDealDto } from "@/modules/tours/dto/update-deal.dto";
import { CreateTourDto } from "@/modules/tours/dto/create-tour.dto";
import { JwtAuthGuard } from "@/modules/auth/jwt.guard";

@Controller("admin/tours")
@UseGuards(JwtAuthGuard)
export class AdminToursController {
  constructor(private svc: ToursService) {}

  /* =======================
        TOURS CRUD
  ======================= */

  // GET /admin/tours
  @Get()
  async getTours() {
    const { items } = await this.svc.findAll({});
    return { items };
  }

  // PUT /admin/tours/:id
  @Put(":id")
  update(@Param("id") id: string, @Body() body: any) {
    return this.svc.update(id, body);
  }

  // DELETE /admin/tours/:id
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.svc.delete(id);
  }

  // DELETE /admin/tours/:id/deal (xoá deal)
  @Delete(":id/deal")
  removeDeal(@Param("id") id: string) {
    return this.svc.removeDeal(id);
  }
  @Put(":id/deal")
  updateDeal(@Param("id") id: string, @Body() dto: UpdateDealDto) {
    return this.svc.updateDeal(id, dto);
  }

  @Post()
  create(@Body() dto: CreateTourDto) {
    return this.svc.createAdminTour(dto);
  }
}
