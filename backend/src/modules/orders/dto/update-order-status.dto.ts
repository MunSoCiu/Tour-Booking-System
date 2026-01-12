import { IsIn } from "class-validator";

export class UpdateOrderStatusDto {
  @IsIn(["pending", "confirmed", "cancelled"])
  status: "pending" | "confirmed" | "cancelled";
}
