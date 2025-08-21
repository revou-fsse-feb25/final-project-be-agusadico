import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsArray,
  Min,
} from "class-validator";
import { Type } from "class-transformer";

export class CreateProductDto {
  @ApiProperty({ description: "Product name" })
  @IsString()
  name: string;

  @ApiProperty({ description: "Product category" })
  @IsString()
  category: string;

  @ApiProperty({ description: "Product price" })
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  price: number;

  @ApiPropertyOptional({ description: "Original price before discount" })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  originalPrice?: number;

  @ApiPropertyOptional({ description: "Discount information" })
  @IsOptional()
  @IsString()
  discount?: string;

  @ApiProperty({ description: "Product image URL" })
  @IsString()
  image: string;

  @ApiPropertyOptional({ description: "Product description" })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: "Product features", type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  features?: string[];

  @ApiPropertyOptional({ description: "Product SKU" })
  @IsOptional()
  @IsString()
  sku?: string;

  @ApiPropertyOptional({ description: "Product rating" })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  rating?: number;

  @ApiPropertyOptional({ description: "Number of reviews" })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  reviewCount?: number;

  @ApiPropertyOptional({ description: "Product availability status" })
  @IsOptional()
  @IsBoolean()
  inStock?: boolean;

  @ApiPropertyOptional({ description: "Product slug for SEO" })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiPropertyOptional({ description: "Product categories", type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  categories?: string[];

  @ApiPropertyOptional({
    description: "Product gallery images",
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  galleryImages?: string[];

  @ApiPropertyOptional({ description: "Product tags", type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}
