import { PartialType } from "@nestjs/swagger";
import { CreateProductRelationDto } from "./create-product-relation.dto";

export class UpdateProductRelationDto extends PartialType(
  CreateProductRelationDto,
) {}
