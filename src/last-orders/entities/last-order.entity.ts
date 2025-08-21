import { ApiProperty } from "@nestjs/swagger";

export class LastOrder {
  @ApiProperty({ description: "Unique identifier" })
  id: number;

  @ApiProperty({ description: "Order amount" })
  amount: number;

  @ApiProperty({ description: "Order date" })
  date: Date;

  @ApiProperty({ description: "Customer ID" })
  customerId: number;
}
