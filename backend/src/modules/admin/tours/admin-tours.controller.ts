import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { ToursService } from "@/modules/tours/tours.service";
import { JwtAuthGuard } from "@/modules/auth/jwt.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { UpdateDealDto } from "@/modules/tours/dto/update-deal.dto";
import { CreateTourDto } from "@/modules/tours/dto/create-tour.dto";

@Controller("admin/tours")
@UseGuards(JwtAuthGuard)
export class AdminToursController {
  constructor(private svc: ToursService) {}

  /* =======================
        CREATE TOUR
  ======================= */
  @Post()
  @UseInterceptors(
    FileInterceptor("image", {
      storage: diskStorage({
        destination: "./uploads/tours",
        filename: (_, file, cb) => {
          const name = Date.now() + extname(file.originalname);
          cb(null, name);
        },
      }),
    })
  )
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { title: string; price: string; image?: string }
  ) {
    return this.svc.createAdminTour({
      title: body.title,
      price: Number(body.price),
      image: file ? `/uploads/tours/${file.filename}` : body.image,
    });
  }

  /* =======================
        TOURS CRUD
  ======================= */

  @Post("json")
  createJson(@Body() dto: CreateTourDto) {
    return this.svc.createAdminTour(dto);
  }

  @Get()
  async getTours() {
    const { items } = await this.svc.findAll({});
    return { items };
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() body: any) {
    return this.svc.update(id, body);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.svc.delete(id);
  }

  /* =======================
        DEAL CRUD
  ======================= */

  @Put(":id/deal")
  updateDeal(@Param("id") id: string, @Body() dto: UpdateDealDto) {
    return this.svc.updateDeal(id, dto);
  }

  @Delete(":id/deal")
  removeDeal(@Param("id") id: string) {
    return this.svc.removeDeal(id);
  }
}
