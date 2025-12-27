import { IsString, IsInt, Min } from "class-validator";

export class CreateVnpayPaymentDto {
  @IsString()
  orderId: string;

  @IsInt()
  @Min(1000)
  amount: number;

  @IsString()
  orderInfo: string;

  @IsString()
  ipAddr: string;
}
