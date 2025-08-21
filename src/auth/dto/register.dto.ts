import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength, IsOptional } from "class-validator";

export class RegisterDto {
  @ApiProperty({
    description: "Customer unique identifier (optional - will be auto-generated)",
    example: "CUST-001",
    required: false,
  })
  @IsOptional()
  @IsString()
  customerId?: string;

  @ApiProperty({
    description: "Customer full name",
    example: "John Doe",
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: "Customer email address",
    example: "john.doe@example.com",
  })
  @IsString()
  email: string;

  @ApiProperty({
    description: "Customer password (minimum 6 characters)",
    example: "securepassword123",
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    description: "Customer username (optional)",
    example: "johndoe",
    required: false,
  })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiProperty({
    description: "Customer phone number (optional)",
    example: "+1234567890",
    required: false,
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({
    description: "Customer address (optional)",
    example: "123 Main St",
    required: false,
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({
    description: "Customer city (optional)",
    example: "New York",
    required: false,
  })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({
    description: "Customer location (optional)",
    example: "NYC",
    required: false,
  })
  @IsOptional()
  @IsString()
  location?: string;
}
