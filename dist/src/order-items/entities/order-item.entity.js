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
exports.OrderItem = void 0;
const swagger_1 = require("@nestjs/swagger");
class OrderItem {
}
exports.OrderItem = OrderItem;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Unique identifier" }),
    __metadata("design:type", Number)
], OrderItem.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Product name" }),
    __metadata("design:type", String)
], OrderItem.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Product image URL" }),
    __metadata("design:type", String)
], OrderItem.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Quantity of the product" }),
    __metadata("design:type", Number)
], OrderItem.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Product price" }),
    __metadata("design:type", Number)
], OrderItem.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "Product category" }),
    __metadata("design:type", String)
], OrderItem.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Order ID this item belongs to" }),
    __metadata("design:type", Number)
], OrderItem.prototype, "orderId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "Product ID reference" }),
    __metadata("design:type", Number)
], OrderItem.prototype, "productId", void 0);
//# sourceMappingURL=order-item.entity.js.map