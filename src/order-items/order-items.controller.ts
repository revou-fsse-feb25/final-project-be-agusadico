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
import { OrderItemsService } from "./order-items.service";
import { CreateOrderItemDto } from "./dto/create-order-item.dto";
import { UpdateOrderItemDto } from "./dto/update-order-item.dto";
import {
  ApiTags,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from "@nestjs/swagger";
import { OrderItem } from "./entities/order-item.entity";

@ApiTags("order-items")
@ApiExtraModels(CreateOrderItemDto)
@Controller("order-items")
export class OrderItemsController {
  constructor(private readonly orderItemsService: OrderItemsService) {}

  @Post()
  @ApiOperation({ summary: "Create a new order item" })
  @ApiResponse({
    status: 201,
    description: "The order item has been successfully created.",
    type: OrderItem,
  })
  create(@Body() createOrderItemDto: CreateOrderItemDto) {
    return this.orderItemsService.create(createOrderItemDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all order items" })
  @ApiResponse({
    status: 200,
    description: "Return all order items.",
    type: [OrderItem],
  })
  findAll() {
    return this.orderItemsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get an order item by id" })
  @ApiParam({ name: "id", description: "Order item ID" })
  @ApiResponse({
    status: 200,
    description: "Return the order item.",
    type: OrderItem,
  })
  @ApiResponse({ status: 404, description: "Order item not found." })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.orderItemsService.findOne(id);
  }

  @Get("order/:orderId")
  @ApiOperation({ summary: "Get order items by order ID" })
  @ApiParam({ name: "orderId", description: "Order ID" })
  @ApiResponse({
    status: 200,
    description: "Return order items for the specified order.",
    type: [OrderItem],
  })
  findByOrderId(@Param("orderId", ParseIntPipe) orderId: number) {
    return this.orderItemsService.findByOrderId(orderId);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update an order item" })
  @ApiParam({ name: "id", description: "Order item ID" })
  @ApiResponse({
    status: 200,
    description: "The order item has been successfully updated.",
    type: OrderItem,
  })
  @ApiResponse({ status: 404, description: "Order item not found." })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateOrderItemDto: UpdateOrderItemDto,
  ) {
    return this.orderItemsService.update(id, updateOrderItemDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete an order item" })
  @ApiParam({ name: "id", description: "Order item ID" })
  @ApiResponse({
    status: 200,
    description: "The order item has been successfully deleted.",
  })
  @ApiResponse({ status: 404, description: "Order item not found." })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.orderItemsService.remove(id);
  }
}
