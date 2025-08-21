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
exports.OrderItemsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let OrderItemsService = class OrderItemsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createOrderItemDto) {
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
    async findOne(id) {
        const orderItem = await this.prisma.orderItem.findUnique({
            where: { id },
            include: {
                order: true,
                product: true,
            },
        });
        if (!orderItem) {
            throw new common_1.NotFoundException(`Order item with ID ${id} not found`);
        }
        return orderItem;
    }
    async findByOrderId(orderId) {
        return this.prisma.orderItem.findMany({
            where: { orderId },
            include: {
                order: true,
                product: true,
            },
        });
    }
    async update(id, updateOrderItemDto) {
        try {
            return await this.prisma.orderItem.update({
                where: { id },
                data: updateOrderItemDto,
                include: {
                    order: true,
                    product: true,
                },
            });
        }
        catch (_a) {
            throw new common_1.NotFoundException(`Order item with ID ${id} not found`);
        }
    }
    async remove(id) {
        try {
            await this.prisma.orderItem.delete({
                where: { id },
            });
            return { id, deleted: true };
        }
        catch (_a) {
            throw new common_1.NotFoundException(`Order item with ID ${id} not found`);
        }
    }
};
exports.OrderItemsService = OrderItemsService;
exports.OrderItemsService = OrderItemsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrderItemsService);
//# sourceMappingURL=order-items.service.js.map