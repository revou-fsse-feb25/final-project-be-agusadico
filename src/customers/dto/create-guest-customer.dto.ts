import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateGuestCustomerDto {
  @ApiProperty({ description: "Guest customer name" })
  @IsString()
  name: string;
}