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
exports.LastOrdersController = void 0;
const common_1 = require("@nestjs/common");
const last_orders_service_1 = require("./last-orders.service");
const create_last_order_dto_1 = require("./dto/create-last-order.dto");
const update_last_order_dto_1 = require("./dto/update-last-order.dto");
const swagger_1 = require("@nestjs/swagger");
const last_order_entity_1 = require("./entities/last-order.entity");
let LastOrdersController = class LastOrdersController {
    constructor(lastOrdersService) {
        this.lastOrdersService = lastOrdersService;
    }
    create(createLastOrderDto) {
        return this.lastOrdersService.create(createLastOrderDto);
    }
    findAll() {
        return this.lastOrdersService.findAll();
    }
    findOne(id) {
        return this.lastOrdersService.findOne(id);
    }
    findByCustomerId(customerId) {
        return this.lastOrdersService.findByCustomerId(customerId);
    }
    update(id, updateLastOrderDto) {
        return this.lastOrdersService.update(id, updateLastOrderDto);
    }
    remove(id) {
        return this.lastOrdersService.remove(id);
    }
};
exports.LastOrdersController = LastOrdersController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: "Create a new last order" }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "The last order has been successfully created.",
        type: last_order_entity_1.LastOrder,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: "Bad request - customer does not exist or last order already exists.",
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_last_order_dto_1.CreateLastOrderDto]),
    __metadata("design:returntype", void 0)
], LastOrdersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "Get all last orders" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Return all last orders.",
        type: [last_order_entity_1.LastOrder],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LastOrdersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Get a last order by id" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Last order ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Return the last order.",
        type: last_order_entity_1.LastOrder,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Last order not found." }),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], LastOrdersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)("customer/:customerId"),
    (0, swagger_1.ApiOperation)({ summary: "Get last order by customer ID" }),
    (0, swagger_1.ApiParam)({ name: "customerId", description: "Customer ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Return last order for the specified customer.",
        type: last_order_entity_1.LastOrder,
    }),
    __param(0, (0, common_1.Param)("customerId", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], LastOrdersController.prototype, "findByCustomerId", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Update a last order" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Last order ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "The last order has been successfully updated.",
        type: last_order_entity_1.LastOrder,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Last order not found." }),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_last_order_dto_1.UpdateLastOrderDto]),
    __metadata("design:returntype", void 0)
], LastOrdersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Delete a last order" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Last order ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "The last order has been successfully deleted.",
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Last order not found." }),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], LastOrdersController.prototype, "remove", null);
exports.LastOrdersController = LastOrdersController = __decorate([
    (0, swagger_1.ApiTags)("last-orders"),
    (0, common_1.Controller)("last-orders"),
    __metadata("design:paramtypes", [last_orders_service_1.LastOrdersService])
], LastOrdersController);
//# sourceMappingURL=last-orders.controller.js.map