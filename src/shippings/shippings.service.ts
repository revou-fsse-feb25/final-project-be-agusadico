import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateShippingDto } from "./dto/create-shipping.dto";
import { UpdateShippingDto } from "./dto/update-shipping.dto";

@Injectable()
export class ShippingsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createShippingDto: CreateShippingDto) {
    return this.prisma.shipping.create({
      data: createShippingDto,
      include: {
        order: true,
      },
    });
  }

  async findAll() {
    return this.prisma.shipping.findMany({
      include: {
        order: true,
      },
    });
  }

  async findOne(id: number) {
    const shipping = await this.prisma.shipping.findUnique({
      where: { id },
      include: {
        order: true,
      },
    });

    if (!shipping) {
      throw new NotFoundException(`Shipping with ID ${id} not found`);
    }

    return shipping;
  }

  async findByOrderId(orderId: number) {
    const shipping = await this.prisma.shipping.findUnique({
      where: { orderId },
      include: {
        order: true,
      },
    });

    return shipping;
  }

  async update(id: number, updateShippingDto: UpdateShippingDto) {
    try {
      return await this.prisma.shipping.update({
        where: { id },
        data: updateShippingDto,
        include: {
          order: true,
        },
      });
    } catch {
      throw new NotFoundException(`Shipping with ID ${id} not found`);
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.shipping.delete({
        where: { id },
      });

      return { id, deleted: true };
    } catch {
      throw new NotFoundException(`Shipping with ID ${id} not found`);
    }
  }
}
