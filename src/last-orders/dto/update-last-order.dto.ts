import { PartialType } from "@nestjs/swagger";
import { CreateLastOrderDto } from "./create-last-order.dto";

export class UpdateLastOrderDto extends PartialType(CreateLastOrderDto) {}
