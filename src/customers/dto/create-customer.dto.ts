import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsString,
  IsEmail,
  IsOptional,
  IsNumber,
  IsDateString,
  Min,
  IsEnum,
} from "class-validator";
import { Type } from "class-transformer";

export class CreateCustomerDto {
  @ApiProperty({ description: "Customer unique identifier" })
  @IsString()
  customerId: string;

  @ApiProperty({ description: "Customer name" })
  @IsString()
  name: string;

  @ApiProperty({ description: "Customer email" })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({ description: "Customer password" })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiPropertyOptional({ description: "Customer username" })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiPropertyOptional({ description: "Customer phone number" })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ description: "Customer address" })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ description: "Customer city" })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional({ description: "Customer birthday" })
  @IsOptional()
  @IsDateString()
  birthday?: string;

  @ApiPropertyOptional({ description: "Customer profile image URL" })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiPropertyOptional({ description: "Customer location" })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional({ description: "Total amount spent by customer" })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  totalSpent?: number;

  @ApiPropertyOptional({
    description: "User role",
    enum: ["USER", "ADMIN"],
    example: "USER",
  })
  @IsOptional()
  @IsEnum(["USER", "ADMIN"])
  role?: "USER" | "ADMIN";
}
