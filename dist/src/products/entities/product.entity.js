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
exports.Product = void 0;
const swagger_1 = require("@nestjs/swagger");
class Product {
}
exports.Product = Product;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Unique identifier" }),
    __metadata("design:type", Number)
], Product.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Product name" }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Product category" }),
    __metadata("design:type", String)
], Product.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Product price" }),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "Original price before discount" }),
    __metadata("design:type", Number)
], Product.prototype, "originalPrice", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "Discount information" }),
    __metadata("design:type", String)
], Product.prototype, "discount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Product image URL" }),
    __metadata("design:type", String)
], Product.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "Product description" }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "Product features", type: [String] }),
    __metadata("design:type", Array)
], Product.prototype, "features", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "Product SKU" }),
    __metadata("design:type", String)
], Product.prototype, "sku", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "Product rating" }),
    __metadata("design:type", Number)
], Product.prototype, "rating", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "Number of reviews" }),
    __metadata("design:type", Number)
], Product.prototype, "reviewCount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "Product availability status" }),
    __metadata("design:type", Boolean)
], Product.prototype, "inStock", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "Product slug for SEO" }),
    __metadata("design:type", String)
], Product.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "Product categories", type: [String] }),
    __metadata("design:type", Array)
], Product.prototype, "categories", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Product gallery images",
        type: [String],
    }),
    __metadata("design:type", Array)
], Product.prototype, "galleryImages", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "Product tags", type: [String] }),
    __metadata("design:type", Array)
], Product.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Creation timestamp" }),
    __metadata("design:type", Date)
], Product.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Last update timestamp" }),
    __metadata("design:type", Date)
], Product.prototype, "updatedAt", void 0);
//# sourceMappingURL=product.entity.js.map