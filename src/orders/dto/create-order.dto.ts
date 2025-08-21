import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsDateString,
  IsArray,
  ValidateNested,
  Min,
  IsInt,
  IsUrl,
} from "class-validator";
import { Type } from "class-transformer";
import { OrderType, OrderStatus } from "@prisma/client";
import { CreateBillingDto } from "../../billings/dto/create-billing.dto";
import { CreateShippingDto } from "../../shippings/dto/create-shipping.dto";

// Simplified DTO for order items when creating an order
class CreateOrderItemForOrderDto {
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

  @ApiPropertyOptional({ description: "Product ID reference" })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  productId?: number;
}

export class CreateOrderDto {
  @ApiProperty({ description: "Order unique identifier" })
  @IsString()
  orderId: string;

  @ApiPropertyOptional({ description: "Order date" })
  @IsOptional()
  @IsDateString()
  date?: string;

  @ApiPropertyOptional({ description: "Booked at ISO date" })
  @IsOptional()
  @IsDateString()
  bookedAtIso?: string;

  @ApiProperty({ description: "Customer name" })
  @IsString()
  customerName: string;

  @ApiProperty({ description: "Order type", enum: OrderType })
  @IsEnum(OrderType)
  typeOrder: OrderType;

  @ApiProperty({ description: "Order amount" })
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  amount: number;

  @ApiProperty({ description: "Order status", enum: OrderStatus })
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @ApiPropertyOptional({ description: "Order note" })
  @IsOptional()
  @IsString()
  note?: string;

  @ApiPropertyOptional({ description: "Customer ID" })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  customerId?: number;

  @ApiPropertyOptional({
    description: "Order items",
    type: [CreateOrderItemForOrderDto],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemForOrderDto)
  items?: CreateOrderItemForOrderDto[];

  @ApiPropertyOptional({ description: "Billing information" })
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateBillingDto)
  billing?: CreateBillingDto;

  @ApiPropertyOptional({ description: "Shipping information" })
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateShippingDto)
  shipping?: CreateShippingDto;
}
