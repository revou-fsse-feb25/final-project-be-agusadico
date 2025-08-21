import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class Product {
  @ApiProperty({ description: "Unique identifier" })
  id: number;

  @ApiProperty({ description: "Product name" })
  name: string;

  @ApiProperty({ description: "Product category" })
  category: string;

  @ApiProperty({ description: "Product price" })
  price: number;

  @ApiPropertyOptional({ description: "Original price before discount" })
  originalPrice?: number;

  @ApiPropertyOptional({ description: "Discount information" })
  discount?: string;

  @ApiProperty({ description: "Product image URL" })
  image: string;

  @ApiPropertyOptional({ description: "Product description" })
  description?: string;

  @ApiPropertyOptional({ description: "Product features", type: [String] })
  features: string[];

  @ApiPropertyOptional({ description: "Product SKU" })
  sku?: string;

  @ApiPropertyOptional({ description: "Product rating" })
  rating?: number;

  @ApiPropertyOptional({ description: "Number of reviews" })
  reviewCount?: number;

  @ApiPropertyOptional({ description: "Product availability status" })
  inStock: boolean;

  @ApiPropertyOptional({ description: "Product slug for SEO" })
  slug?: string;

  @ApiPropertyOptional({ description: "Product categories", type: [String] })
  categories: string[];

  @ApiPropertyOptional({
    description: "Product gallery images",
    type: [String],
  })
  galleryImages: string[];

  @ApiPropertyOptional({ description: "Product tags", type: [String] })
  tags: string[];

  @ApiProperty({ description: "Creation timestamp" })
  createdAt: Date;

  @ApiProperty({ description: "Last update timestamp" })
  updatedAt: Date;
}
