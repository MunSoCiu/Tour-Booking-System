import { Controller, Post, Body, Get, Param } from "@nestjs/common";
import { PaymentsService } from "./payments.service";

@Controller("payments")
export class PaymentsController {
  constructor(private svc: PaymentsService) {}

  @Post("create")
  create(@Body() body: any) {
    // mock create payment record
    return this.svc.create(body);
  }

  @Get("user/:userId")
  history(@Param("userId") userId: string) {
    return this.svc.findByUser(userId);
  }
}
