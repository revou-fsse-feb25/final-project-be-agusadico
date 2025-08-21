import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateOrderItemDto } from "./dto/create-order-item.dto";
import { UpdateOrderItemDto } from "./dto/update-order-item.dto";

@Injectable()
export class OrderItemsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOrderItemDto: CreateOrderItemDto) {
    return this.prisma.orderItem.create({
      data: createOrderItemDto,
      include: {
        order: true,
        product: true,
      },
    });
  }

  async findAll() {
    return this.prisma.orderItem.findMany({
      include: {
        order: true,
        product: true,
      },
    });
  }

  async findOne(id: number) {
    const orderItem = await this.prisma.orderItem.findUnique({
      where: { id },
      include: {
        order: true,
        product: true,
      },
    });

    if (!orderItem) {
      throw new NotFoundException(`Order item with ID ${id} not found`);
    }

    return orderItem;
  }

  async findByOrderId(orderId: number) {
    return this.prisma.orderItem.findMany({
      where: { orderId },
      include: {
        order: true,
        product: true,
      },
    });
  }

  async update(id: number, updateOrderItemDto: UpdateOrderItemDto) {
    try {
      return await this.prisma.orderItem.update({
        where: { id },
        data: updateOrderItemDto,
        include: {
          order: true,
          product: true,
        },
      });
    } catch {
      throw new NotFoundException(`Order item with ID ${id} not found`);
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.orderItem.delete({
        where: { id },
      });

      return { id, deleted: true };
    } catch {
      throw new NotFoundException(`Order item with ID ${id} not found`);
    }
  }
}
