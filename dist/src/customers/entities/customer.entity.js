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
exports.Customer = void 0;
const swagger_1 = require("@nestjs/swagger");
class Customer {
}
exports.Customer = Customer;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Unique identifier" }),
    __metadata("design:type", Number)
], Customer.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Customer unique identifier" }),
    __metadata("design:type", String)
], Customer.prototype, "customerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Customer name" }),
    __metadata("design:type", String)
], Customer.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Customer email" }),
    __metadata("design:type", String)
], Customer.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "Customer username" }),
    __metadata("design:type", String)
], Customer.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "Customer phone number" }),
    __metadata("design:type", String)
], Customer.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "Customer address" }),
    __metadata("design:type", String)
], Customer.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "Customer city" }),
    __metadata("design:type", String)
], Customer.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "Customer birthday" }),
    __metadata("design:type", Date)
], Customer.prototype, "birthday", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "Customer profile image URL" }),
    __metadata("design:type", String)
], Customer.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Customer join date" }),
    __metadata("design:type", Date)
], Customer.prototype, "joinDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: "Customer location" }),
    __metadata("design:type", String)
], Customer.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Total amount spent by customer" }),
    __metadata("design:type", Number)
], Customer.prototype, "totalSpent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Creation timestamp" }),
    __metadata("design:type", Date)
], Customer.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Last update timestamp" }),
    __metadata("design:type", Date)
], Customer.prototype, "updatedAt", void 0);
//# sourceMappingURL=customer.entity.js.map