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
import { BillingsService } from "./billings.service";
import { CreateBillingDto } from "./dto/create-billing.dto";
import { UpdateBillingDto } from "./dto/update-billing.dto";
import {
  ApiTags,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from "@nestjs/swagger";
import { Billing } from "./entities/billing.entity";

@ApiTags("billings")
@ApiExtraModels(CreateBillingDto)
@Controller("billings")
export class BillingsController {
  constructor(private readonly billingsService: BillingsService) {}

  @Post()
  @ApiOperation({ summary: "Create a new billing" })
  @ApiResponse({
    status: 201,
    description: "The billing has been successfully created.",
    type: Billing,
  })
  create(@Body() createBillingDto: CreateBillingDto) {
    return this.billingsService.create(createBillingDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all billings" })
  @ApiResponse({
    status: 200,
    description: "Return all billings.",
    type: [Billing],
  })
  findAll() {
    return this.billingsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a billing by id" })
  @ApiParam({ name: "id", description: "Billing ID" })
  @ApiResponse({
    status: 200,
    description: "Return the billing.",
    type: Billing,
  })
  @ApiResponse({ status: 404, description: "Billing not found." })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.billingsService.findOne(id);
  }

  @Get("order/:orderId")
  @ApiOperation({ summary: "Get billing by order ID" })
  @ApiParam({ name: "orderId", description: "Order ID" })
  @ApiResponse({
    status: 200,
    description: "Return billing for the specified order.",
    type: Billing,
  })
  findByOrderId(@Param("orderId", ParseIntPipe) orderId: number) {
    return this.billingsService.findByOrderId(orderId);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a billing" })
  @ApiParam({ name: "id", description: "Billing ID" })
  @ApiResponse({
    status: 200,
    description: "The billing has been successfully updated.",
    type: Billing,
  })
  @ApiResponse({ status: 404, description: "Billing not found." })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateBillingDto: UpdateBillingDto,
  ) {
    return this.billingsService.update(id, updateBillingDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a billing" })
  @ApiParam({ name: "id", description: "Billing ID" })
  @ApiResponse({
    status: 200,
    description: "The billing has been successfully deleted.",
  })
  @ApiResponse({ status: 404, description: "Billing not found." })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.billingsService.remove(id);
  }
}
