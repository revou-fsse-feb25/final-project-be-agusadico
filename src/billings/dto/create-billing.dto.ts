import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class CreateBillingDto {
  @ApiProperty({ description: "Billing name" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: "Billing address" })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ description: "Postal code" })
  @IsString()
  @IsNotEmpty()
  postalCode: string;

  @ApiProperty({ description: "Order ID this billing belongs to" })
  @IsNotEmpty()
  orderId: number;
}
