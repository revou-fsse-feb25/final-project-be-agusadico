import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsNotEmpty } from "class-validator";
import { Type } from "class-transformer";

export class CreateProductRelationDto {
  @ApiProperty({ description: "Product ID" })
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  productId: number;

  @ApiProperty({ description: "Related Product ID" })
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  relatedProductId: number;

  @ApiProperty({ description: "Tag reference from Product.tags array" })
  @IsString()
  @IsNotEmpty()
  tag: string;
}
