import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateBillingDto } from "./dto/create-billing.dto";
import { UpdateBillingDto } from "./dto/update-billing.dto";

@Injectable()
export class BillingsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBillingDto: CreateBillingDto) {
    return this.prisma.billing.create({
      data: createBillingDto,
      include: {
        order: true,
      },
    });
  }

  async findAll() {
    return this.prisma.billing.findMany({
      include: {
        order: true,
      },
    });
  }

  async findOne(id: number) {
    const billing = await this.prisma.billing.findUnique({
      where: { id },
      include: {
        order: true,
      },
    });

    if (!billing) {
      throw new NotFoundException(`Billing with ID ${id} not found`);
    }

    return billing;
  }

  async findByOrderId(orderId: number) {
    const billing = await this.prisma.billing.findUnique({
      where: { orderId },
      include: {
        order: true,
      },
    });

    return billing;
  }

  async update(id: number, updateBillingDto: UpdateBillingDto) {
    try {
      return await this.prisma.billing.update({
        where: { id },
        data: updateBillingDto,
        include: {
          order: true,
        },
      });
    } catch {
      throw new NotFoundException(`Billing with ID ${id} not found`);
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.billing.delete({
        where: { id },
      });

      return { id, deleted: true };
    } catch {
      throw new NotFoundException(`Billing with ID ${id} not found`);
    }
  }
}
