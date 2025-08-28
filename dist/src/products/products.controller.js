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
exports.ProductsController = void 0;
const common_1 = require("@nestjs/common");
const products_service_1 = require("./products.service");
const create_product_dto_1 = require("./dto/create-product.dto");
const update_product_dto_1 = require("./dto/update-product.dto");
const swagger_1 = require("@nestjs/swagger");
const product_entity_1 = require("./entities/product.entity");
const public_decorator_1 = require("../auth/decorators/public.decorator");
let ProductsController = class ProductsController {
    constructor(productsService) {
        this.productsService = productsService;
    }
    findAllPublic() {
        return this.productsService.findAll();
    }
    findOnePublic(id) {
        return this.productsService.findOne(id);
    }
    findBySlugPublic(slug) {
        return this.productsService.findBySlug(slug);
    }
    create(createProductDto) {
        return this.productsService.create(createProductDto);
    }
    findAll() {
        return this.productsService.findAll();
    }
    findOne(id) {
        return this.productsService.findOne(id);
    }
    findBySlug(slug) {
        return this.productsService.findBySlug(slug);
    }
    update(id, updateProductDto) {
        return this.productsService.update(id, updateProductDto);
    }
    remove(id) {
        return this.productsService.remove(id);
    }
};
exports.ProductsController = ProductsController;
__decorate([
    (0, common_1.Get)("public"),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: "Get all products (public access)" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Return all products for public viewing.",
        type: [product_entity_1.Product],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "findAllPublic", null);
__decorate([
    (0, common_1.Get)("public/:id"),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: "Get a product by id (public access)" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Product ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Return the product for public viewing.",
        type: product_entity_1.Product,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Product not found." }),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "findOnePublic", null);
__decorate([
    (0, common_1.Get)("public/slug/:slug"),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: "Get a product by slug (public access)" }),
    (0, swagger_1.ApiParam)({ name: "slug", description: "Product slug" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Return the product for public viewing.",
        type: product_entity_1.Product,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Product not found." }),
    __param(0, (0, common_1.Param)("slug")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "findBySlugPublic", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: "Create a new product" }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "The product has been successfully created.",
        type: product_entity_1.Product,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: "Get all products" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Return all products.",
        type: [product_entity_1.Product],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: "Get a product by id" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Product ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Return the product.",
        type: product_entity_1.Product,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Product not found." }),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)("slug/:slug"),
    (0, swagger_1.ApiOperation)({ summary: "Get a product by slug" }),
    (0, swagger_1.ApiParam)({ name: "slug", description: "Product slug" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Return the product.",
        type: product_entity_1.Product,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Product not found." }),
    __param(0, (0, common_1.Param)("slug")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "findBySlug", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: "Update a product" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Product ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "The product has been successfully updated.",
        type: product_entity_1.Product,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Product not found." }),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_product_dto_1.UpdateProductDto]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: "Delete a product" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Product ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "The product has been successfully deleted.",
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Product not found." }),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "remove", null);
exports.ProductsController = ProductsController = __decorate([
    (0, swagger_1.ApiTags)("products"),
    (0, common_1.Controller)("products"),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsController);
//# sourceMappingURL=products.controller.js.map