import { ApiProperty } from "@nestjs/swagger";

export class Shipping {
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
