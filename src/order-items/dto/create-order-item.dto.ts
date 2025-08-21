import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsString,
  IsNumber,
  IsOptional,
  IsUrl,
  Min,
  IsInt,
} from "class-validator";
import { Type } from "class-transformer";

export class CreateOrderItemDto {
  @ApiProperty({ description: "Product name" })
  @IsString()
  name: string;

  @ApiProperty({ description: "Product image URL" })
  @IsUrl()
  image: string;

  @ApiProperty({ description: "Quantity of the product", minimum: 1 })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  quantity: number;

  @ApiProperty({ description: "Product price", minimum: 0 })
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  price: number;

  @ApiPropertyOptional({ description: "Product category" })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({ description: "Order ID this item belongs to" })
  @IsNumber()
  @Type(() => Number)
  orderId: number;

  @ApiPropertyOptional({ description: "Product ID reference" })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  productId?: number;
}
