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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let OrdersService = class OrdersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createOrderDto, userId) {
        const { items, billing, shipping } = createOrderDto, orderData = __rest(createOrderDto, ["items", "billing", "shipping"]);
        return this.prisma.order.create({
            data: Object.assign(Object.assign({}, orderData), { customerId: userId, items: items
                    ? {
                        create: items,
                    }
                    : undefined, billing: billing
                    ? {
                        create: billing,
                    }
                    : undefined, shipping: shipping
                    ? {
                        create: shipping,
                    }
                    : undefined }),
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
    async findMyOrders(userId) {
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
    async findOne(id, user) {
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
            throw new common_1.NotFoundException(`Order with ID ${id} not found`);
        }
        if (user.role !== "ADMIN" && order.customerId !== user.id) {
            throw new common_1.ForbiddenException("You can only access your own orders");
        }
        return order;
    }
    async findByOrderId(orderId, user) {
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
            throw new common_1.NotFoundException(`Order with ID ${orderId} not found`);
        }
        if (user.role !== "ADMIN" && order.customerId !== user.id) {
            throw new common_1.ForbiddenException("You can only access your own orders");
        }
        return order;
    }
    async update(id, updateOrderDto, user) {
        const existingOrder = await this.prisma.order.findUnique({
            where: { id },
            select: { customerId: true },
        });
        if (!existingOrder) {
            throw new common_1.NotFoundException(`Order with ID ${id} not found`);
        }
        if (user.role !== "ADMIN" && existingOrder.customerId !== user.id) {
            throw new common_1.ForbiddenException("You can only update your own orders");
        }
        try {
            return await this.prisma.order.update({
                where: { id },
                data: updateOrderDto,
                include: {
                    items: true,
                    billing: true,
                    shipping: true,
                    customer: true,
                },
            });
        }
        catch (_a) {
            throw new common_1.NotFoundException(`Order with ID ${id} not found`);
        }
    }
    async remove(id, user) {
        const existingOrder = await this.prisma.order.findUnique({
            where: { id },
            select: { customerId: true },
        });
        if (!existingOrder) {
            throw new common_1.NotFoundException(`Order with ID ${id} not found`);
        }
        if (user.role !== "ADMIN" && existingOrder.customerId !== user.id) {
            throw new common_1.ForbiddenException("You can only delete your own orders");
        }
        try {
            await this.prisma.$transaction([
                this.prisma.orderItem.deleteMany({ where: { orderId: id } }),
                this.prisma.billing.deleteMany({ where: { orderId: id } }),
                this.prisma.shipping.deleteMany({ where: { orderId: id } }),
                this.prisma.order.delete({ where: { id } }),
            ]);
            return { id, deleted: true };
        }
        catch (_a) {
            throw new common_1.NotFoundException(`Order with ID ${id} not found`);
        }
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map