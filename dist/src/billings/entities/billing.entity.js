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
exports.Billing = void 0;
const swagger_1 = require("@nestjs/swagger");
class Billing {
}
exports.Billing = Billing;
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
//# sourceMappingURL=billing.entity.js.map