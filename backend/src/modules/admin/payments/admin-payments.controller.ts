import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "@/modules/auth/jwt.guard";
import { PaymentsService } from "@/modules/payments/payments.service";

@Controller("admin/payments")
@UseGuards(JwtAuthGuard)
export class AdminPaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get()
  findAll(
    @Query("status") status?: string,
    @Query("search") search?: string,
    @Query("page") page = 1,
    @Query("limit") limit = 10
  ) {
    return this.paymentsService.findAdminPayments({
      status,
      search,
      page,
      limit,
    });
  }
}
