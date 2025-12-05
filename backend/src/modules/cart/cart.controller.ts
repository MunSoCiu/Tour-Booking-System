import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Put,
} from "@nestjs/common";
import { CartService } from "./cart.service";

@Controller("api/cart")
export class CartController {
  constructor(private svc: CartService) {}

  @Post()
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
  }
}
