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
import { ShippingsService } from "./shippings.service";
import { CreateShippingDto } from "./dto/create-shipping.dto";
import { UpdateShippingDto } from "./dto/update-shipping.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiExtraModels,
} from "@nestjs/swagger";
import { Shipping } from "./entities/shipping.entity";

@ApiTags("shippings")
@ApiExtraModels(CreateShippingDto)
@Controller("shippings")
export class ShippingsController {
  constructor(private readonly shippingsService: ShippingsService) {}

  @Post()
  @ApiOperation({ summary: "Create a new shipping" })
  @ApiResponse({
    status: 201,
    description: "The shipping has been successfully created.",
    type: Shipping,
  })
  create(@Body() createShippingDto: CreateShippingDto) {
    return this.shippingsService.create(createShippingDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all shippings" })
  @ApiResponse({
    status: 200,
    description: "Return all shippings.",
    type: [Shipping],
  })
  findAll() {
    return this.shippingsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a shipping by id" })
  @ApiParam({ name: "id", description: "Shipping ID" })
  @ApiResponse({
    status: 200,
    description: "Return the shipping.",
    type: Shipping,
  })
  @ApiResponse({ status: 404, description: "Shipping not found." })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.shippingsService.findOne(id);
  }

  @Get("order/:orderId")
  @ApiOperation({ summary: "Get shipping by order ID" })
  @ApiParam({ name: "orderId", description: "Order ID" })
  @ApiResponse({
    status: 200,
    description: "Return shipping for the specified order.",
    type: Shipping,
  })
  findByOrderId(@Param("orderId", ParseIntPipe) orderId: number) {
    return this.shippingsService.findByOrderId(orderId);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a shipping" })
  @ApiParam({ name: "id", description: "Shipping ID" })
  @ApiResponse({
    status: 200,
    description: "The shipping has been successfully updated.",
    type: Shipping,
  })
  @ApiResponse({ status: 404, description: "Shipping not found." })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateShippingDto: UpdateShippingDto,
  ) {
    return this.shippingsService.update(id, updateShippingDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a shipping" })
  @ApiParam({ name: "id", description: "Shipping ID" })
  @ApiResponse({
    status: 200,
    description: "The shipping has been successfully deleted.",
  })
  @ApiResponse({ status: 404, description: "Shipping not found." })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.shippingsService.remove(id);
  }
}
