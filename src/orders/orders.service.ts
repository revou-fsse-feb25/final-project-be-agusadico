import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { AuthenticatedUser } from "../auth/interfaces/user.interface";

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto, userId: number) {
    const { items, billing, shipping, ...orderData } = createOrderDto;

    return this.prisma.order.create({
      data: {
        ...orderData,
        customerId: userId, // Associate order with authenticated user
        items: items
          ? {
              create: items,
            }
          : undefined,
        billing: billing
          ? {
              create: billing,
            }
          : undefined,
        shipping: shipping
          ? {
              create: shipping,
            }
          : undefined,
      },
      include: {
        items: true,
        billing: true,
        shipping: true,
        customer: true,
      },
    });
  }

  async findAll() {
    return this.prisma.order.findMany({
      include: {
        items: true,
        billing: true,
        shipping: true,
        customer: true,
      },
    });
  }

  async findMyOrders(userId: number) {
    return this.prisma.order.findMany({
      where: { customerId: userId },
      include: {
        items: true,
        billing: true,
        shipping: true,
        customer: true,
      },
    });
  }

  async findOne(id: number, user: AuthenticatedUser) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        items: true,
        billing: true,
        shipping: true,
        customer: true,
      },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    // Check if user can access this order
    if (user.role !== "ADMIN" && order.customerId !== user.id) {
      throw new ForbiddenException("You can only access your own orders");
    }

    return order;
  }

  async findByOrderId(orderId: string, user: AuthenticatedUser) {
    const order = await this.prisma.order.findUnique({
      where: { orderId },
      include: {
        items: true,
        billing: true,
        shipping: true,
        customer: true,
      },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    // Check if user can access this order
    if (user.role !== "ADMIN" && order.customerId !== user.id) {
      throw new ForbiddenException("You can only access your own orders");
    }

    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto, user: AuthenticatedUser) {
    // Check if user can access this order
    const existingOrder = await this.prisma.order.findUnique({
      where: { id },
      select: { customerId: true },
    });

    if (!existingOrder) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    if (user.role !== "ADMIN" && existingOrder.customerId !== user.id) {
      throw new ForbiddenException("You can only update your own orders");
    }

    try {
      return await this.prisma.order.update({
        where: { id },
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        data: updateOrderDto as any, // Type assertion to resolve Prisma type mismatch
        include: {
          items: true,
          billing: true,
          shipping: true,
          customer: true,
        },
      });
    } catch {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
  }

  async remove(id: number, user: AuthenticatedUser) {
    // Check if user can access this order
    const existingOrder = await this.prisma.order.findUnique({
      where: { id },
      select: { customerId: true },
    });

    if (!existingOrder) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    if (user.role !== "ADMIN" && existingOrder.customerId !== user.id) {
      throw new ForbiddenException("You can only delete your own orders");
    }

    try {
      // First delete related records due to foreign key constraints
      await this.prisma.$transaction([
        this.prisma.orderItem.deleteMany({ where: { orderId: id } }),
        this.prisma.billing.deleteMany({ where: { orderId: id } }),
        this.prisma.shipping.deleteMany({ where: { orderId: id } }),
        this.prisma.order.delete({ where: { id } }),
      ]);

      return { id, deleted: true };
    } catch {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
  }
}
