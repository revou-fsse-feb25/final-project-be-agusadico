import { ApiProperty } from "@nestjs/swagger";

export class ProductRelation {
  @ApiProperty({ description: "Unique identifier" })
  id: number;

  @ApiProperty({ description: "Product ID" })
  productId: number;

  @ApiProperty({ description: "Related Product ID" })
  relatedProductId: number;

  @ApiProperty({ description: "Tag reference from Product.tags array" })
  tag: string;
}
