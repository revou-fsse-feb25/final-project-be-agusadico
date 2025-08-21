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
exports.BillingsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let BillingsService = class BillingsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createBillingDto) {
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
    async findOne(id) {
        const billing = await this.prisma.billing.findUnique({
            where: { id },
            include: {
                order: true,
            },
        });
        if (!billing) {
            throw new common_1.NotFoundException(`Billing with ID ${id} not found`);
        }
        return billing;
    }
    async findByOrderId(orderId) {
        const billing = await this.prisma.billing.findUnique({
            where: { orderId },
            include: {
                order: true,
            },
        });
        return billing;
    }
    async update(id, updateBillingDto) {
        try {
            return await this.prisma.billing.update({
                where: { id },
                data: updateBillingDto,
                include: {
                    order: true,
                },
            });
        }
        catch (_a) {
            throw new common_1.NotFoundException(`Billing with ID ${id} not found`);
        }
    }
    async remove(id) {
        try {
            await this.prisma.billing.delete({
                where: { id },
            });
            return { id, deleted: true };
        }
        catch (_a) {
            throw new common_1.NotFoundException(`Billing with ID ${id} not found`);
        }
    }
};
exports.BillingsService = BillingsService;
exports.BillingsService = BillingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BillingsService);
//# sourceMappingURL=billings.service.js.map