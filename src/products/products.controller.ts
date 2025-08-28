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
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";
import { Product } from "./entities/product.entity";
import { Public } from "../auth/decorators/public.decorator";

@ApiTags("products")
@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get("public")
  @Public()
  @ApiOperation({ summary: "Get all products (public access)" })
  @ApiResponse({
    status: 200,
    description: "Return all products for public viewing.",
    type: [Product],
  })
  findAllPublic() {
    return this.productsService.findAll();
  }

  @Get("public/:id")
  @Public()
  @ApiOperation({ summary: "Get a product by id (public access)" })
  @ApiParam({ name: "id", description: "Product ID" })
  @ApiResponse({
    status: 200,
    description: "Return the product for public viewing.",
    type: Product,
  })
  @ApiResponse({ status: 404, description: "Product not found." })
  findOnePublic(@Param("id", ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @Get("public/slug/:slug")
  @Public()
  @ApiOperation({ summary: "Get a product by slug (public access)" })
  @ApiParam({ name: "slug", description: "Product slug" })
  @ApiResponse({
    status: 200,
    description: "Return the product for public viewing.",
    type: Product,
  })
  @ApiResponse({ status: 404, description: "Product not found." })
  findBySlugPublic(@Param("slug") slug: string) {
    return this.productsService.findBySlug(slug);
  }

  @Post()
  @ApiOperation({ summary: "Create a new product" })
  @ApiResponse({
    status: 201,
    description: "The product has been successfully created.",
    type: Product,
  })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @Public()
  @ApiOperation({ summary: "Get all products" })
  @ApiResponse({
    status: 200,
    description: "Return all products.",
    type: [Product],
  })
  findAll() {
    return this.productsService.findAll();
  }

  @Get(":id")
  @Public()
  @ApiOperation({ summary: "Get a product by id" })
  @ApiParam({ name: "id", description: "Product ID" })
  @ApiResponse({
    status: 200,
    description: "Return the product.",
    type: Product,
  })
  @ApiResponse({ status: 404, description: "Product not found." })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @Get("slug/:slug")
  @ApiOperation({ summary: "Get a product by slug" })
  @ApiParam({ name: "slug", description: "Product slug" })
  @ApiResponse({
    status: 200,
    description: "Return the product.",
    type: Product,
  })
  @ApiResponse({ status: 404, description: "Product not found." })
  findBySlug(@Param("slug") slug: string) {
    return this.productsService.findBySlug(slug);
  }

  @Patch(":id")
  @Public()
  @ApiOperation({ summary: "Update a product" })
  @ApiParam({ name: "id", description: "Product ID" })
  @ApiResponse({
    status: 200,
    description: "The product has been successfully updated.",
    type: Product,
  })
  @ApiResponse({ status: 404, description: "Product not found." })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(":id")
  @Public()
  @ApiOperation({ summary: "Delete a product" })
  @ApiParam({ name: "id", description: "Product ID" })
  @ApiResponse({
    status: 200,
    description: "The product has been successfully deleted.",
  })
  @ApiResponse({ status: 404, description: "Product not found." })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }
}
