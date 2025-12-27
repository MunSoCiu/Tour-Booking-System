import { IsArray, IsInt, IsUUID, Min } from "class-validator";

export class CreateOrderItemDto {
  @IsUUID()
  tourId: string;

  @IsInt()
  @Min(1)
  qty: number;
}

export class CreateOrderDto {
  @IsArray()
  items: CreateOrderItemDto[];
}
