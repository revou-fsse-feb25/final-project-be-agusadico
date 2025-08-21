import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class Customer {
  @ApiProperty({ description: "Unique identifier" })
  id: number;

  @ApiProperty({ description: "Customer unique identifier" })
  customerId: string;

  @ApiProperty({ description: "Customer name" })
  name: string;

  @ApiProperty({ description: "Customer email" })
  email: string;

  @ApiPropertyOptional({ description: "Customer username" })
  username?: string;

  @ApiPropertyOptional({ description: "Customer phone number" })
  phone?: string;

  @ApiPropertyOptional({ description: "Customer address" })
  address?: string;

  @ApiPropertyOptional({ description: "Customer city" })
  city?: string;

  @ApiPropertyOptional({ description: "Customer birthday" })
  birthday?: Date;

  @ApiPropertyOptional({ description: "Customer profile image URL" })
  image?: string;

  @ApiProperty({ description: "Customer join date" })
  joinDate: Date;

  @ApiPropertyOptional({ description: "Customer location" })
  location?: string;

  @ApiProperty({ description: "Total amount spent by customer" })
  totalSpent: number;

  @ApiProperty({ description: "Creation timestamp" })
  createdAt: Date;

  @ApiProperty({ description: "Last update timestamp" })
  updatedAt: Date;
}
