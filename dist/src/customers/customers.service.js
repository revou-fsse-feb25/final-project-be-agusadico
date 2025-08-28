"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CustomersService = class CustomersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createCustomerDto) {
        return this.prisma.customer.create({
            data: createCustomerDto,
        });
    }
    async createGuest(createGuestCustomerDto) {
        const timestamp = Date.now().toString();
        const randomSuffix = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        const uniqueCustomerId = `GUEST-${timestamp}-${randomSuffix}`;
        return this.prisma.customer.create({
            data: {
                customerId: uniqueCustomerId,
                name: createGuestCustomerDto.name,
                email: `guest_${timestamp}@example.com`,
                role: 'USER'
            },
        });
    }
    async findAll() {
        return this.prisma.customer.findMany({
            include: {
                lastOrder: true,
            },
        });
    }
    async findOne(id) {
        const customer = await this.prisma.customer.findUnique({
            where: { id },
            include: {
                orders: true,
                lastOrder: true,
            },
        });
        if (!customer) {
            throw new common_1.NotFoundException(`Customer with ID ${id} not found`);
        }
        return customer;
    }
    async findByCustomerId(customerId) {
        const customer = await this.prisma.customer.findUnique({
            where: { customerId },
            include: {
                orders: true,
                lastOrder: true,
            },
        });
        if (!customer) {
            throw new common_1.NotFoundException(`Customer with ID ${customerId} not found`);
        }
        return customer;
    }
    async update(id, updateCustomerDto, user) {
        if (user && user.role !== "ADMIN") {
            if (user.id !== id) {
                throw new common_1.ForbiddenException("You can only update your own profile");
            }
        }
        try {
            return await this.prisma.customer.update({
                where: { id },
                data: updateCustomerDto,
            });
        }
        catch (_a) {
            throw new common_1.NotFoundException(`Customer with ID ${id} not found`);
        }
    }
    async updateRole(id, updateRoleDto) {
        try {
            return await this.prisma.customer.update({
                where: { id },
                data: {
                    role: updateRoleDto.role,
                },
            });
        }
        catch (_a) {
            throw new common_1.NotFoundException(`Customer with ID ${id} not found`);
        }
    }
    async remove(id) {
        try {
            return await this.prisma.customer.delete({
                where: { id },
            });
        }
        catch (_a) {
            throw new common_1.NotFoundException(`Customer with ID ${id} not found`);
        }
    }
};
exports.CustomersService = CustomersService;
exports.CustomersService = CustomersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CustomersService);
//# sourceMappingURL=customers.service.js.map