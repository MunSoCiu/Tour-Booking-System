import { IsIn } from "class-validator";

export class UpdateOrderStatusDto {
  @IsIn(["pending", "success", "cancelled"])
  status: "pending" | "success" | "cancelled";
}
