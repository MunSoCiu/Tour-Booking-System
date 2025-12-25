import {
  IsInt,
  IsOptional,
  IsString,
  IsDateString,
  Min,
  Max,
} from "class-validator";

export class UpdateDealDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  discount?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  discountPrice?: number;

  @IsOptional()
  @IsString()
  dealType?: string | null;

  @IsOptional()
  @IsDateString()
  dealStart?: Date | null;

  @IsOptional()
  @IsDateString()
  dealEnd?: Date | null;
}
