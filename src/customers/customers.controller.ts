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
import { CustomersService } from "./customers.service";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from "@nestjs/swagger";
import { Customer } from "./entities/customer.entity";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../auth/decorators/roles.decorator";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { AuthenticatedUser } from "../auth/interfaces/user.interface";

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
  @UseGuards(JwtAuthGuard) // Temporarily remove RolesGuard and @Roles for testing
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({ summary: "Update a customer" })
  @ApiParam({ name: "id", description: "Customer ID" })
  @ApiResponse({
    status: 200,
    description: "The customer has been successfully updated.",
    type: Customer,
  })
  @ApiResponse({ status: 404, description: "Customer not found." })
  @Patch(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("ADMIN")
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({ summary: "Update a customer (Admin only)" })
  @ApiParam({ name: "id", description: "Customer ID" })
  @ApiResponse({
    status: 200,
    description: "The customer has been successfully updated.",
    type: Customer,
  })
  @ApiResponse({ status: 404, description: "Customer not found." })
  @ApiResponse({ status: 403, description: "Forbidden - Admin access required." })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateCustomerDto: UpdateCustomerDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.customersService.update(id, updateCustomerDto, user);
  }

  @Patch(":id/role")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("ADMIN")
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({ summary: "Update customer role (Admin only)" })
  @ApiParam({ name: "id", description: "Customer ID" })
  @ApiResponse({
    status: 200,
    description: "The customer role has been successfully updated.",
    type: Customer,
  })
  @ApiResponse({ status: 404, description: "Customer not found." })
  @ApiResponse({ status: 403, description: "Forbidden - Admin access required." })
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
