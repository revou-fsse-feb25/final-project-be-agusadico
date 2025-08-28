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
import { CustomersService } from "./customers.service";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";
import { Customer } from "./entities/customer.entity";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { AuthenticatedUser } from "../auth/interfaces/user.interface";
import { Public } from "../auth/decorators/public.decorator";
import { CreateGuestCustomerDto } from "./dto/create-guest-customer.dto";

@ApiTags("customers")
@Controller("customers")
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @ApiOperation({ summary: "Create a new customer" })
  @ApiResponse({
    status: 201,
    description: "The customer has been successfully created.",
    type: Customer,
  })
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }
  
  @Public()
  @Post('guest')
  @ApiOperation({ summary: "Create a guest customer with only name" })
  @ApiResponse({
    status: 201,
    description: "The guest customer has been successfully created.",
    type: Customer,
  })
  createGuest(@Body() createGuestCustomerDto: CreateGuestCustomerDto) {
    return this.customersService.createGuest(createGuestCustomerDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all customers" })
  @ApiResponse({
    status: 200,
    description: "Return all customers.",
    type: [Customer],
  })
  findAll() {
    return this.customersService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a customer by id" })
  @ApiParam({ name: "id", description: "Customer ID" })
  @ApiResponse({
    status: 200,
    description: "Return the customer.",
    type: Customer,
  })
  @ApiResponse({ status: 404, description: "Customer not found." })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.customersService.findOne(id);
  }

  @Get("customer-id/:customerId")
  @ApiOperation({ summary: "Get a customer by customerId" })
  @ApiParam({ name: "customerId", description: "Customer unique identifier" })
  @ApiResponse({
    status: 200,
    description: "Return the customer.",
    type: Customer,
  })
  @ApiResponse({ status: 404, description: "Customer not found." })
  findByCustomerId(@Param("customerId") customerId: string) {
    return this.customersService.findByCustomerId(customerId);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a customer" })
  @ApiParam({ name: "id", description: "Customer ID" })
  @ApiResponse({
    status: 200,
    description: "The customer has been successfully updated.",
    type: Customer,
  })
  @ApiResponse({ status: 404, description: "Customer not found." })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateCustomerDto: UpdateCustomerDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.customersService.update(id, updateCustomerDto, user);
  }

  @Patch(":id/role")
  @ApiOperation({ summary: "Update customer role" })
  @ApiParam({ name: "id", description: "Customer ID" })
  @ApiResponse({
    status: 200,
    description: "The customer role has been successfully updated.",
    type: Customer,
  })
  @ApiResponse({ status: 404, description: "Customer not found." })
  updateRole(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateRoleDto: UpdateRoleDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.customersService.updateRole(id, updateRoleDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a customer" })
  @ApiParam({ name: "id", description: "Customer ID" })
  @ApiResponse({
    status: 200,
    description: "The customer has been successfully deleted.",
    type: Customer,
  })
  @ApiResponse({ status: 404, description: "Customer not found." })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.customersService.remove(id);
  }
}
