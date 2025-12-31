import {
  Controller,
  Post,
  Body,
  Get,
<<<<<<< HEAD
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
@UseGuards(JwtAuthGuard) // 🔥 BẮT BUỘC
=======
  Param,
  Delete,
  Put,
} from "@nestjs/common";
import { CartService } from "./cart.service";

@Controller("cart")
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0
export class CartController {
  constructor(private svc: CartService) {}

  @Post()
<<<<<<< HEAD
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
    @Body("qty") qty: number,
    @Req() req: RequestWithUser
  ) {
    return this.svc.updateQty(id, qty, req.user.sub);
  }

  @Delete(":id")
  remove(@Param("id") id: string, @Req() req: RequestWithUser) {
    return this.svc.remove(id, req.user.sub);
=======
  add(@Body() body: any) {
    return this.svc.add(body);
  }

  @Get("user/:userId")
  getUserCart(@Param("userId") userId: string) {
    return this.svc.findByUser(userId);
  }

  @Put(":id")
  updateQty(@Param("id") id: string, @Body() body: { qty: number }) {
    return this.svc.updateQty(id, body.qty);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.svc.remove(id);
>>>>>>> ab840f992aa0769c334dbf2673efcbc376cf9dc0
  }
}
