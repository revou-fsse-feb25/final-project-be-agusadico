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
import { LastOrdersService } from "./last-orders.service";
import { CreateLastOrderDto } from "./dto/create-last-order.dto";
import { UpdateLastOrderDto } from "./dto/update-last-order.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";
import { LastOrder } from "./entities/last-order.entity";

@ApiTags("last-orders")
@Controller("last-orders")
export class LastOrdersController {
  constructor(private readonly lastOrdersService: LastOrdersService) {}

  @Post()
  @ApiOperation({ summary: "Create a new last order" })
  @ApiResponse({
    status: 201,
    description: "The last order has been successfully created.",
    type: LastOrder,
  })
  @ApiResponse({
    status: 400,
    description:
      "Bad request - customer does not exist or last order already exists.",
  })
  create(@Body() createLastOrderDto: CreateLastOrderDto) {
    return this.lastOrdersService.create(createLastOrderDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all last orders" })
  @ApiResponse({
    status: 200,
    description: "Return all last orders.",
    type: [LastOrder],
  })
  findAll() {
    return this.lastOrdersService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a last order by id" })
  @ApiParam({ name: "id", description: "Last order ID" })
  @ApiResponse({
    status: 200,
    description: "Return the last order.",
    type: LastOrder,
  })
  @ApiResponse({ status: 404, description: "Last order not found." })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.lastOrdersService.findOne(id);
  }

  @Get("customer/:customerId")
  @ApiOperation({ summary: "Get last order by customer ID" })
  @ApiParam({ name: "customerId", description: "Customer ID" })
  @ApiResponse({
    status: 200,
    description: "Return last order for the specified customer.",
    type: LastOrder,
  })
  findByCustomerId(@Param("customerId", ParseIntPipe) customerId: number) {
    return this.lastOrdersService.findByCustomerId(customerId);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a last order" })
  @ApiParam({ name: "id", description: "Last order ID" })
  @ApiResponse({
    status: 200,
    description: "The last order has been successfully updated.",
    type: LastOrder,
  })
  @ApiResponse({ status: 404, description: "Last order not found." })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateLastOrderDto: UpdateLastOrderDto,
  ) {
    return this.lastOrdersService.update(id, updateLastOrderDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a last order" })
  @ApiParam({ name: "id", description: "Last order ID" })
  @ApiResponse({
    status: 200,
    description: "The last order has been successfully deleted.",
  })
  @ApiResponse({ status: 404, description: "Last order not found." })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.lastOrdersService.remove(id);
  }
}
