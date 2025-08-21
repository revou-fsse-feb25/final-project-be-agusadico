import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { OrderType, OrderStatus } from "@prisma/client";

// Define nested entities inline to avoid circular dependencies
class OrderItem {
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

class Billing {
  @ApiProperty({ description: "Unique identifier" })
  id: number;

  @ApiProperty({ description: "Billing name" })
  name: string;

  @ApiProperty({ description: "Billing address" })
  address: string;

  @ApiProperty({ description: "Postal code" })
  postalCode: string;

  @ApiProperty({ description: "Order ID this billing belongs to" })
  orderId: number;
}

class Shipping {
  @ApiProperty({ description: "Unique identifier" })
  id: number;

  @ApiProperty({ description: "Shipping name" })
  name: string;

  @ApiProperty({ description: "Shipping address" })
  address: string;

  @ApiProperty({ description: "Postal code" })
  postalCode: string;

  @ApiProperty({ description: "Order ID this shipping belongs to" })
  orderId: number;
}

export class Order {
  @ApiProperty({ description: "Unique identifier" })
  id: number;

  @ApiProperty({ description: "Order unique identifier" })
  orderId: string;

  @ApiProperty({ description: "Order date" })
  date: Date;

  @ApiProperty({ description: "Creation timestamp" })
  createdAt: Date;

  @ApiPropertyOptional({ description: "Booked at ISO date" })
  bookedAtIso?: Date;

  @ApiProperty({ description: "Customer name" })
  customerName: string;

  @ApiProperty({ description: "Order type", enum: OrderType })
  typeOrder: OrderType;

  @ApiProperty({ description: "Order amount" })
  amount: number;

  @ApiProperty({ description: "Order status", enum: OrderStatus })
  status: OrderStatus;

  @ApiPropertyOptional({ description: "Order note" })
  note?: string;

  @ApiPropertyOptional({ description: "Order items", type: [OrderItem] })
  items?: OrderItem[];

  @ApiPropertyOptional({ description: "Customer ID" })
  customerId?: number;

  @ApiPropertyOptional({ description: "Billing information", type: Billing })
  billing?: Billing;

  @ApiPropertyOptional({ description: "Shipping information", type: Shipping })
  shipping?: Shipping;
}
