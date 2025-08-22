import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from "@nestjs/swagger";
import { Product } from "./entities/product.entity";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../auth/decorators/roles.decorator";
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

  @ApiBearerAuth("JWT-auth")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @Roles("ADMIN")
  @ApiOperation({ summary: "Create a new product" })
  @ApiResponse({
    status: 201,
    description: "The product has been successfully created.",
    type: Product,
  })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @ApiBearerAuth("JWT-auth")
  @UseGuards(JwtAuthGuard, RolesGuard)
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

  @ApiBearerAuth("JWT-auth")
  @UseGuards(JwtAuthGuard, RolesGuard)
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

  @ApiBearerAuth("JWT-auth")
  @UseGuards(JwtAuthGuard, RolesGuard)
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

  @ApiBearerAuth("JWT-auth")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(":id")
  @Roles("ADMIN")
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

  @ApiBearerAuth("JWT-auth")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(":id")
  @Roles("ADMIN")
  @ApiOperation({ summary: "Delete a product" })
  @ApiParam({ name: "id", description: "Product ID" })
  @ApiResponse({
    status: 200,
    description: "The product has been successfully deleted.",
    type: Product,
  })
  @ApiResponse({ status: 404, description: "Product not found." })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }
}
