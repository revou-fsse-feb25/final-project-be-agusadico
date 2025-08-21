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
exports.ProductRelation = void 0;
const swagger_1 = require("@nestjs/swagger");
class ProductRelation {
}
exports.ProductRelation = ProductRelation;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Unique identifier" }),
    __metadata("design:type", Number)
], ProductRelation.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Product ID" }),
    __metadata("design:type", Number)
], ProductRelation.prototype, "productId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Related Product ID" }),
    __metadata("design:type", Number)
], ProductRelation.prototype, "relatedProductId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Tag reference from Product.tags array" }),
    __metadata("design:type", String)
], ProductRelation.prototype, "tag", void 0);
//# sourceMappingURL=product-relation.entity.js.map