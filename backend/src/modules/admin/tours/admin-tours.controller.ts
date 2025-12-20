import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from "@nestjs/common";
import { ToursService } from "@/modules/tours/tours.service";

@Controller("admin/tours")
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

  // POST /admin/tours
  @Post()
  create(@Body() body: any) {
    return this.svc.createAdminTour(body);
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

  /* =======================
        DEAL CRUD
  ======================= */

  // PUT /admin/tours/:id/deal  (thêm / sửa deal)
  @Put(":id/deal")
  updateDeal(@Param("id") id: string, @Body() body: any) {
    return this.svc.updateDeal(id, body);
  }

  // DELETE /admin/tours/:id/deal (xoá deal)
  @Delete(":id/deal")
  removeDeal(@Param("id") id: string) {
    return this.svc.removeDeal(id);
  }
}
