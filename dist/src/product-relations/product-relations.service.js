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
exports.ProductRelationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProductRelationsService = class ProductRelationsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createProductRelationDto) {
        const { productId, relatedProductId } = createProductRelationDto;
        const [product, relatedProduct] = await Promise.all([
            this.prisma.product.findUnique({ where: { id: productId } }),
            this.prisma.product.findUnique({ where: { id: relatedProductId } }),
        ]);
        if (!product || !relatedProduct) {
            throw new common_1.BadRequestException("One or both products do not exist");
        }
        const existingRelation = await this.prisma.productRelation.findUnique({
            where: {
                productId_relatedProductId: {
                    productId,
                    relatedProductId,
                },
            },
        });
        if (existingRelation) {
            throw new common_1.BadRequestException("Product relation already exists");
        }
        return this.prisma.productRelation.create({
            data: createProductRelationDto,
            include: {
                product: true,
                relatedProduct: true,
            },
        });
    }
    async findAll() {
        return this.prisma.productRelation.findMany({
            include: {
                product: true,
                relatedProduct: true,
            },
        });
    }
    async findOne(id) {
        const productRelation = await this.prisma.productRelation.findUnique({
            where: { id },
            include: {
                product: true,
                relatedProduct: true,
            },
        });
        if (!productRelation) {
            throw new common_1.NotFoundException(`Product relation with ID ${id} not found`);
        }
        return productRelation;
    }
    async findByProductId(productId) {
        return this.prisma.productRelation.findMany({
            where: { productId },
            include: {
                product: true,
                relatedProduct: true,
            },
        });
    }
    async findByTag(tag) {
        return this.prisma.productRelation.findMany({
            where: { tag },
            include: {
                product: true,
                relatedProduct: true,
            },
        });
    }
    async update(id, updateProductRelationDto) {
        try {
            return await this.prisma.productRelation.update({
                where: { id },
                data: updateProductRelationDto,
                include: {
                    product: true,
                    relatedProduct: true,
                },
            });
        }
        catch (_a) {
            throw new common_1.NotFoundException(`Product relation with ID ${id} not found`);
        }
    }
    async remove(id) {
        try {
            await this.prisma.productRelation.delete({
                where: { id },
            });
            return { id, deleted: true };
        }
        catch (_a) {
            throw new common_1.NotFoundException(`Product relation with ID ${id} not found`);
        }
    }
};
exports.ProductRelationsService = ProductRelationsService;
exports.ProductRelationsService = ProductRelationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductRelationsService);
//# sourceMappingURL=product-relations.service.js.map