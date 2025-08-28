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
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from "@nestjs/swagger";
import { Order } from "./entities/order.entity";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { AuthenticatedUser } from "../auth/interfaces/user.interface";

@ApiTags("orders")
@Controller("orders")
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: "Create a new order" })
  @ApiResponse({
    status: 201,
    description: "The order has been successfully created.",
    type: Order,
  })
  create(@Body() createOrderDto: CreateOrderDto, @CurrentUser() user: AuthenticatedUser) {
    // Use default user ID 1 if no user is authenticated
    return this.ordersService.create(createOrderDto, user ? user.id : 1);
  }

  @Get()
  @ApiOperation({ summary: "Get all orders" })
  @ApiResponse({
    status: 200,
    description: "Return all orders.",
    type: [Order],
  })
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get an order by id" })
  @ApiParam({ name: "id", description: "Order ID" })
  @ApiResponse({ status: 200, description: "Return the order.", type: Order })
  @ApiResponse({ status: 404, description: "Order not found." })
  findOne(@Param("id", ParseIntPipe) id: number, @CurrentUser() user: AuthenticatedUser) {
    return this.ordersService.findOne(id, user);
  }

  @Get("order-id/:orderId")
  @ApiOperation({ summary: "Get an order by orderId" })
  @ApiParam({ name: "orderId", description: "Order unique identifier" })
  @ApiResponse({ status: 200, description: "Return the order.", type: Order })
  @ApiResponse({ status: 404, description: "Order not found." })
  findByOrderId(@Param("orderId") orderId: string, @CurrentUser() user: AuthenticatedUser) {
    return this.ordersService.findByOrderId(orderId, user);
  }

  @Get("my-orders")
  @ApiOperation({ summary: "Get current user's orders" })
  @ApiResponse({
    status: 200,
    description: "Return user's orders.",
    type: [Order],
  })
  findMyOrders(@CurrentUser() user: AuthenticatedUser) {
    // Use default user ID 1 if no user is authenticated
    return this.ordersService.findMyOrders(user ? user.id : 1);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update an order" })
  @ApiParam({ name: "id", description: "Order ID" })
  @ApiResponse({
    status: 200,
    description: "The order has been successfully updated.",
    type: Order,
  })
  @ApiResponse({ status: 404, description: "Order not found." })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateOrderDto: UpdateOrderDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.ordersService.update(id, updateOrderDto, user);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete an order" })
  @ApiParam({ name: "id", description: "Order ID" })
  @ApiResponse({
    status: 200,
    description: "The order has been successfully deleted.",
  })
  @ApiResponse({ status: 404, description: "Order not found." })
  remove(@Param("id", ParseIntPipe) id: number, @CurrentUser() user: AuthenticatedUser) {
    return this.ordersService.remove(id, user);
  }
}
