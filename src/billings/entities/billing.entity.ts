import { ApiProperty } from "@nestjs/swagger";

export class Billing {
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
