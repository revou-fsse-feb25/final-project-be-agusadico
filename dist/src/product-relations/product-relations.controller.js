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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRelationsController = void 0;
const common_1 = require("@nestjs/common");
const product_relations_service_1 = require("./product-relations.service");
const create_product_relation_dto_1 = require("./dto/create-product-relation.dto");
const update_product_relation_dto_1 = require("./dto/update-product-relation.dto");
const swagger_1 = require("@nestjs/swagger");
const product_relation_entity_1 = require("./entities/product-relation.entity");
let ProductRelationsController = class ProductRelationsController {
    constructor(productRelationsService) {
        this.productRelationsService = productRelationsService;
    }
    create(createProductRelationDto) {
        return this.productRelationsService.create(createProductRelationDto);
    }
    findAll() {
        return this.productRelationsService.findAll();
    }
    findOne(id) {
        return this.productRelationsService.findOne(id);
    }
    findByProductId(productId) {
        return this.productRelationsService.findByProductId(productId);
    }
    findByTag(tag) {
        return this.productRelationsService.findByTag(tag);
    }
    update(id, updateProductRelationDto) {
        return this.productRelationsService.update(id, updateProductRelationDto);
    }
    remove(id) {
        return this.productRelationsService.remove(id);
    }
};
exports.ProductRelationsController = ProductRelationsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: "Create a new product relation" }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "The product relation has been successfully created.",
        type: product_relation_entity_1.ProductRelation,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: "Bad request - products do not exist or relation already exists.",
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_relation_dto_1.CreateProductRelationDto]),
    __metadata("design:returntype", void 0)
], ProductRelationsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "Get all product relations" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Return all product relations.",
        type: [product_relation_entity_1.ProductRelation],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductRelationsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Get a product relation by id" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Product relation ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Return the product relation.",
        type: product_relation_entity_1.ProductRelation,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Product relation not found." }),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductRelationsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)("product/:productId"),
    (0, swagger_1.ApiOperation)({ summary: "Get product relations by product ID" }),
    (0, swagger_1.ApiParam)({ name: "productId", description: "Product ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Return product relations for the specified product.",
        type: [product_relation_entity_1.ProductRelation],
    }),
    __param(0, (0, common_1.Param)("productId", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductRelationsController.prototype, "findByProductId", null);
__decorate([
    (0, common_1.Get)("tag/:tag"),
    (0, swagger_1.ApiOperation)({ summary: "Get product relations by tag" }),
    (0, swagger_1.ApiParam)({ name: "tag", description: "Tag name" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Return product relations for the specified tag.",
        type: [product_relation_entity_1.ProductRelation],
    }),
    __param(0, (0, common_1.Param)("tag")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductRelationsController.prototype, "findByTag", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Update a product relation" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Product relation ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "The product relation has been successfully updated.",
        type: product_relation_entity_1.ProductRelation,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Product relation not found." }),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_product_relation_dto_1.UpdateProductRelationDto]),
    __metadata("design:returntype", void 0)
], ProductRelationsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Delete a product relation" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Product relation ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "The product relation has been successfully deleted.",
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Product relation not found." }),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductRelationsController.prototype, "remove", null);
exports.ProductRelationsController = ProductRelationsController = __decorate([
    (0, swagger_1.ApiTags)("product-relations"),
    (0, common_1.Controller)("product-relations"),
    __metadata("design:paramtypes", [product_relations_service_1.ProductRelationsService])
], ProductRelationsController);
//# sourceMappingURL=product-relations.controller.js.map