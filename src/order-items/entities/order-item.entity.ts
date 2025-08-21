import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class OrderItem {
  @ApiProperty({ description: "Unique identifier" })
  id: number;

  @ApiProperty({ description: "Product name" })
  name: string;

  @ApiProperty({ description: "Product image URL" })
  image: string;

  @ApiProperty({ description: "Quantity of the product" })
  quantity: number;

  @ApiProperty({ description: "Product price" })
  price: number;

  @ApiPropertyOptional({ description: "Product category" })
  category?: string;

  @ApiProperty({ description: "Order ID this item belongs to" })
  orderId: number;

  @ApiPropertyOptional({ description: "Product ID reference" })
  productId?: number;
}
