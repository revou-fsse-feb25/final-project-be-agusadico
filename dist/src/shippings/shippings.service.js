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
exports.ShippingsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ShippingsService = class ShippingsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createShippingDto) {
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
    async findOne(id) {
        const shipping = await this.prisma.shipping.findUnique({
            where: { id },
            include: {
                order: true,
            },
        });
        if (!shipping) {
            throw new common_1.NotFoundException(`Shipping with ID ${id} not found`);
        }
        return shipping;
    }
    async findByOrderId(orderId) {
        const shipping = await this.prisma.shipping.findUnique({
            where: { orderId },
            include: {
                order: true,
            },
        });
        return shipping;
    }
    async update(id, updateShippingDto) {
        try {
            return await this.prisma.shipping.update({
                where: { id },
                data: updateShippingDto,
                include: {
                    order: true,
                },
            });
        }
        catch (_a) {
            throw new common_1.NotFoundException(`Shipping with ID ${id} not found`);
        }
    }
    async remove(id) {
        try {
            await this.prisma.shipping.delete({
                where: { id },
            });
            return { id, deleted: true };
        }
        catch (_a) {
            throw new common_1.NotFoundException(`Shipping with ID ${id} not found`);
        }
    }
};
exports.ShippingsService = ShippingsService;
exports.ShippingsService = ShippingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ShippingsService);
//# sourceMappingURL=shippings.service.js.map