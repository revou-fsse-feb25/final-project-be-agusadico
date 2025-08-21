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
exports.Order = void 0;
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
class OrderItem {
}
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
class Billing {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Unique identifier" }),
    __metadata("design:type", Number)
], Billing.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Billing name" }),
    __metadata("design:type", String)
], Billing.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Billing address" }),
    __metadata("design:type", String)
], Billing.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Postal code" }),
    __metadata("design:type", String)
], Billing.prototype, "postalCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Order ID this billing belongs to" }),
    __metadata("design:type", Number)
], Billing.prototype, "orderId", void 0);
class Shipping {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Unique identifier" }),
    __metadata("design:type", Number)
], Shipping.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Shipping name" }),
    __metadata("design:type", String)
], Shipping.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Shipping address" }),
    __metadata("design:type", String)
], Shipping.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Postal code" }),
    __metadata("design:type", String)
], Shipping.prototype, "postalCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Order ID this shipping belongs to" }),
    __metadata("design:type", Number)
], Shipping.prototype, "orderId", void 0);
class Order {
}
exports.Order = Order;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Unique identifier" }),
    __metadata("design:type", Number)
], Order.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Order unique identifier" }),
    __metadata("design:type", String)
], Order.prototype, "orderId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Order date" }),
    __metadata("design:type", Date)
], Order.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Creation timestamp" }),
    __metadata("design:type", Date)
], Order.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "Booked at ISO date" }),
    __metadata("design:type", Date)
], Order.prototype, "bookedAtIso", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Customer name" }),
    __metadata("design:type", String)
], Order.prototype, "customerName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Order type", enum: client_1.OrderType }),
    __metadata("design:type", String)
], Order.prototype, "typeOrder", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Order amount" }),
    __metadata("design:type", Number)
], Order.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Order status", enum: client_1.OrderStatus }),
    __metadata("design:type", String)
], Order.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "Order note" }),
    __metadata("design:type", String)
], Order.prototype, "note", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "Order items", type: [OrderItem] }),
    __metadata("design:type", Array)
], Order.prototype, "items", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "Customer ID" }),
    __metadata("design:type", Number)
], Order.prototype, "customerId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "Billing information", type: Billing }),
    __metadata("design:type", Billing)
], Order.prototype, "billing", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "Shipping information", type: Shipping }),
    __metadata("design:type", Shipping)
], Order.prototype, "shipping", void 0);
//# sourceMappingURL=order.entity.js.map