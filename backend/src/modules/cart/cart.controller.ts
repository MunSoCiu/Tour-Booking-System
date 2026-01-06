import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Put,
  Param,
  UseGuards,
  Req,
} from "@nestjs/common";
import { CartService } from "./cart.service";
import { JwtAuthGuard } from "../auth/jwt.guard";
import { RequestWithUser } from "@/common/types/request-with-user";

@Controller("cart")
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private svc: CartService) {}

  @Post()
  add(
    @Req() req: RequestWithUser,
    @Body() body: { tourId: string; qty: number; date?: string }
  ) {
    return this.svc.add({
      userId: req.user.sub,
      tourId: body.tourId,
      qty: body.qty,
    });
  }

  @Get()
  getMyCart(@Req() req: RequestWithUser) {
    return this.svc.findByUser(req.user.sub);
  }

  @Put(":id")
  updateQty(
    @Param("id") id: string,
    @Body("quantity") quantity: number,
    @Req() req: RequestWithUser
  ) {
    return this.svc.updateQty(id, quantity, req.user.sub);
  }

  @Delete(":id")
  remove(@Param("id") id: string, @Req() req: RequestWithUser) {
    return this.svc.remove(id, req.user.sub);
  }

  @Put(":id/select")
  toggleSelect(
    @Param("id") id: string,
    @Body("selected") selected: boolean,
    @Req() req: RequestWithUser
  ) {
    return this.svc.toggleSelect(id, selected, req.user.sub);
  }
}
