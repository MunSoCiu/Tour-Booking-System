import { IsString, IsInt, Min } from "class-validator";

export class CreateMomoPaymentDto {
  @IsString()
  orderId: string;

  @IsInt()
  @Min(1000)
  amount: number;

  @IsString()
  orderInfo: string;
}
