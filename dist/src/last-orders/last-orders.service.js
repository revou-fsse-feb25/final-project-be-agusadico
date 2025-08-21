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
exports.LastOrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let LastOrdersService = class LastOrdersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createLastOrderDto) {
        const { customerId } = createLastOrderDto;
        const customer = await this.prisma.customer.findUnique({
            where: { id: customerId },
        });
        if (!customer) {
            throw new common_1.BadRequestException("Customer does not exist");
        }
        const existingLastOrder = await this.prisma.lastOrder.findUnique({
            where: { customerId },
        });
        if (existingLastOrder) {
            throw new common_1.BadRequestException("Last order already exists for this customer");
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
    async findOne(id) {
        const lastOrder = await this.prisma.lastOrder.findUnique({
            where: { id },
            include: {
                customer: true,
            },
        });
        if (!lastOrder) {
            throw new common_1.NotFoundException(`Last order with ID ${id} not found`);
        }
        return lastOrder;
    }
    async findByCustomerId(customerId) {
        const lastOrder = await this.prisma.lastOrder.findUnique({
            where: { customerId },
            include: {
                customer: true,
            },
        });
        return lastOrder;
    }
    async update(id, updateLastOrderDto) {
        try {
            return await this.prisma.lastOrder.update({
                where: { id },
                data: updateLastOrderDto,
                include: {
                    customer: true,
                },
            });
        }
        catch (_a) {
            throw new common_1.NotFoundException(`Last order with ID ${id} not found`);
        }
    }
    async remove(id) {
        try {
            await this.prisma.lastOrder.delete({
                where: { id },
            });
            return { id, deleted: true };
        }
        catch (_a) {
            throw new common_1.NotFoundException(`Last order with ID ${id} not found`);
        }
    }
};
exports.LastOrdersService = LastOrdersService;
exports.LastOrdersService = LastOrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LastOrdersService);
//# sourceMappingURL=last-orders.service.js.map