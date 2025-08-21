import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from "@nestjs/common";
import { ProductRelationsService } from "./product-relations.service";
import { CreateProductRelationDto } from "./dto/create-product-relation.dto";
import { UpdateProductRelationDto } from "./dto/update-product-relation.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";
import { ProductRelation } from "./entities/product-relation.entity";

@ApiTags("product-relations")
@Controller("product-relations")
export class ProductRelationsController {
  constructor(
    private readonly productRelationsService: ProductRelationsService,
  ) {}

  @Post()
  @ApiOperation({ summary: "Create a new product relation" })
  @ApiResponse({
    status: 201,
    description: "The product relation has been successfully created.",
    type: ProductRelation,
  })
  @ApiResponse({
    status: 400,
    description:
      "Bad request - products do not exist or relation already exists.",
  })
  create(@Body() createProductRelationDto: CreateProductRelationDto) {
    return this.productRelationsService.create(createProductRelationDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all product relations" })
  @ApiResponse({
    status: 200,
    description: "Return all product relations.",
    type: [ProductRelation],
  })
  findAll() {
    return this.productRelationsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a product relation by id" })
  @ApiParam({ name: "id", description: "Product relation ID" })
  @ApiResponse({
    status: 200,
    description: "Return the product relation.",
    type: ProductRelation,
  })
  @ApiResponse({ status: 404, description: "Product relation not found." })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.productRelationsService.findOne(id);
  }

  @Get("product/:productId")
  @ApiOperation({ summary: "Get product relations by product ID" })
  @ApiParam({ name: "productId", description: "Product ID" })
  @ApiResponse({
    status: 200,
    description: "Return product relations for the specified product.",
    type: [ProductRelation],
  })
  findByProductId(@Param("productId", ParseIntPipe) productId: number) {
    return this.productRelationsService.findByProductId(productId);
  }

  @Get("tag/:tag")
  @ApiOperation({ summary: "Get product relations by tag" })
  @ApiParam({ name: "tag", description: "Tag name" })
  @ApiResponse({
    status: 200,
    description: "Return product relations for the specified tag.",
    type: [ProductRelation],
  })
  findByTag(@Param("tag") tag: string) {
    return this.productRelationsService.findByTag(tag);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a product relation" })
  @ApiParam({ name: "id", description: "Product relation ID" })
  @ApiResponse({
    status: 200,
    description: "The product relation has been successfully updated.",
    type: ProductRelation,
  })
  @ApiResponse({ status: 404, description: "Product relation not found." })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateProductRelationDto: UpdateProductRelationDto,
  ) {
    return this.productRelationsService.update(id, updateProductRelationDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a product relation" })
  @ApiParam({ name: "id", description: "Product relation ID" })
  @ApiResponse({
    status: 200,
    description: "The product relation has been successfully deleted.",
  })
  @ApiResponse({ status: 404, description: "Product relation not found." })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.productRelationsService.remove(id);
  }
}
