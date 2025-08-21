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
exports.ShippingsController = void 0;
const common_1 = require("@nestjs/common");
const shippings_service_1 = require("./shippings.service");
const create_shipping_dto_1 = require("./dto/create-shipping.dto");
const update_shipping_dto_1 = require("./dto/update-shipping.dto");
const swagger_1 = require("@nestjs/swagger");
const shipping_entity_1 = require("./entities/shipping.entity");
let ShippingsController = class ShippingsController {
    constructor(shippingsService) {
        this.shippingsService = shippingsService;
    }
    create(createShippingDto) {
        return this.shippingsService.create(createShippingDto);
    }
    findAll() {
        return this.shippingsService.findAll();
    }
    findOne(id) {
        return this.shippingsService.findOne(id);
    }
    findByOrderId(orderId) {
        return this.shippingsService.findByOrderId(orderId);
    }
    update(id, updateShippingDto) {
        return this.shippingsService.update(id, updateShippingDto);
    }
    remove(id) {
        return this.shippingsService.remove(id);
    }
};
exports.ShippingsController = ShippingsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: "Create a new shipping" }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "The shipping has been successfully created.",
        type: shipping_entity_1.Shipping,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_shipping_dto_1.CreateShippingDto]),
    __metadata("design:returntype", void 0)
], ShippingsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "Get all shippings" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Return all shippings.",
        type: [shipping_entity_1.Shipping],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ShippingsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Get a shipping by id" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Shipping ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Return the shipping.",
        type: shipping_entity_1.Shipping,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Shipping not found." }),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ShippingsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)("order/:orderId"),
    (0, swagger_1.ApiOperation)({ summary: "Get shipping by order ID" }),
    (0, swagger_1.ApiParam)({ name: "orderId", description: "Order ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Return shipping for the specified order.",
        type: shipping_entity_1.Shipping,
    }),
    __param(0, (0, common_1.Param)("orderId", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ShippingsController.prototype, "findByOrderId", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Update a shipping" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Shipping ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "The shipping has been successfully updated.",
        type: shipping_entity_1.Shipping,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Shipping not found." }),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_shipping_dto_1.UpdateShippingDto]),
    __metadata("design:returntype", void 0)
], ShippingsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Delete a shipping" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Shipping ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "The shipping has been successfully deleted.",
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Shipping not found." }),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ShippingsController.prototype, "remove", null);
exports.ShippingsController = ShippingsController = __decorate([
    (0, swagger_1.ApiTags)("shippings"),
    (0, swagger_1.ApiExtraModels)(create_shipping_dto_1.CreateShippingDto),
    (0, common_1.Controller)("shippings"),
    __metadata("design:paramtypes", [shippings_service_1.ShippingsService])
], ShippingsController);
//# sourceMappingURL=shippings.controller.js.map