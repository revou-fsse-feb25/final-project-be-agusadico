import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsDateString, Min } from "class-validator";
import { Type } from "class-transformer";

export class CreateLastOrderDto {
  @ApiProperty({ description: "Order amount", minimum: 0 })
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  amount: number;

  @ApiProperty({ description: "Order date" })
  @IsDateString()
  date: string;

  @ApiProperty({ description: "Customer ID" })
  @IsNumber()
  @Type(() => Number)
  customerId: number;
}
