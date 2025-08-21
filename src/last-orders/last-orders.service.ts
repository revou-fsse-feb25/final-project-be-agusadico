import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateLastOrderDto } from "./dto/create-last-order.dto";
import { UpdateLastOrderDto } from "./dto/update-last-order.dto";

@Injectable()
export class LastOrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createLastOrderDto: CreateLastOrderDto) {
    const { customerId } = createLastOrderDto;

    // Check if customer exists
    const customer = await this.prisma.customer.findUnique({
      where: { id: customerId },
    });

    if (!customer) {
      throw new BadRequestException("Customer does not exist");
    }

    // Check if last order already exists for this customer
    const existingLastOrder = await this.prisma.lastOrder.findUnique({
      where: { customerId },
    });

    if (existingLastOrder) {
      throw new BadRequestException(
        "Last order already exists for this customer",
      );
    }

    return this.prisma.lastOrder.create({
      data: createLastOrderDto,
      include: {
        customer: true,
      },
    });
  }

  async findAll() {
    return this.prisma.lastOrder.findMany({
      include: {
        customer: true,
      },
    });
  }

  async findOne(id: number) {
    const lastOrder = await this.prisma.lastOrder.findUnique({
      where: { id },
      include: {
        customer: true,
      },
    });

    if (!lastOrder) {
      throw new NotFoundException(`Last order with ID ${id} not found`);
    }

    return lastOrder;
  }

  async findByCustomerId(customerId: number) {
    const lastOrder = await this.prisma.lastOrder.findUnique({
      where: { customerId },
      include: {
        customer: true,
      },
    });

    return lastOrder;
  }

  async update(id: number, updateLastOrderDto: UpdateLastOrderDto) {
    try {
      return await this.prisma.lastOrder.update({
        where: { id },
        data: updateLastOrderDto,
        include: {
          customer: true,
        },
      });
    } catch {
      throw new NotFoundException(`Last order with ID ${id} not found`);
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.lastOrder.delete({
        where: { id },
      });

      return { id, deleted: true };
    } catch {
      throw new NotFoundException(`Last order with ID ${id} not found`);
    }
  }
}
