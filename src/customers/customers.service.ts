import { Injectable, NotFoundException, ForbiddenException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { AuthenticatedUser } from "../auth/interfaces/user.interface";

@Injectable()
export class CustomersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCustomerDto: CreateCustomerDto) {
    return this.prisma.customer.create({
      data: createCustomerDto,
    });
  }

  async findAll() {
    return this.prisma.customer.findMany({
      include: {
        lastOrder: true,
      },
    });
  }

  async findOne(id: number) {
    const customer = await this.prisma.customer.findUnique({
      where: { id },
      include: {
        orders: true,
        lastOrder: true,
      },
    });

    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }

    return customer;
  }

  async findByCustomerId(customerId: string) {
    const customer = await this.prisma.customer.findUnique({
      where: { customerId },
      include: {
        orders: true,
        lastOrder: true,
      },
    });

    if (!customer) {
      throw new NotFoundException(`Customer with ID ${customerId} not found`);
    }

    return customer;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto, user?: AuthenticatedUser) {
    // If user is provided, check if they have permission to update this customer
    if (user && user.role !== "ADMIN") {
      // Regular users can only update their own profile
      if (user.id !== id) {
        throw new ForbiddenException("You can only update your own profile");
      }
    }

    try {
      return await this.prisma.customer.update({
        where: { id },
        data: updateCustomerDto,
      });
    } catch {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
  }

  async updateRole(id: number, updateRoleDto: UpdateRoleDto) {
    try {
      return await this.prisma.customer.update({
        where: { id },
        data: {
          role: updateRoleDto.role,
        },
      });
    } catch {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.customer.delete({
        where: { id },
      });
    } catch {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
  }
}
