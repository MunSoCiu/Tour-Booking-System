import {
  IsString,
  IsInt,
  IsOptional,
  IsArray,
  ValidateNested,
  Min,
} from "class-validator";
import { Type } from "class-transformer";

class TourItineraryDto {
  @IsString()
  day: string;

  @IsString()
  title: string;

  @IsString()
  desc: string;
}

export class CreateTourDto {
  @IsString()
  title: string;

  @IsString()
  slug: string;

  @IsString()
  location: string;

  @IsString()
  duration: string;

  @IsInt()
  @Min(0)
  price: number;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TourItineraryDto)
  itinerary: TourItineraryDto[];
}
