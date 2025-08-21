import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class CreateShippingDto {
  @ApiProperty({ description: "Shipping name" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: "Shipping address" })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ description: "Postal code" })
  @IsString()
  @IsNotEmpty()
  postalCode: string;

  @ApiProperty({ description: "Order ID this shipping belongs to" })
  @IsNotEmpty()
  orderId: number;
}
