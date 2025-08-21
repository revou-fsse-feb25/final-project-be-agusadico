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
exports.LastOrder = void 0;
const swagger_1 = require("@nestjs/swagger");
class LastOrder {
}
exports.LastOrder = LastOrder;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Unique identifier" }),
    __metadata("design:type", Number)
], LastOrder.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Order amount" }),
    __metadata("design:type", Number)
], LastOrder.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Order date" }),
    __metadata("design:type", Date)
], LastOrder.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Customer ID" }),
    __metadata("design:type", Number)
], LastOrder.prototype, "customerId", void 0);
//# sourceMappingURL=last-order.entity.js.map