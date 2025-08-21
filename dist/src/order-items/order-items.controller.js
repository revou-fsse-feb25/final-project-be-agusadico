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
exports.OrderItemsController = void 0;
const common_1 = require("@nestjs/common");
const order_items_service_1 = require("./order-items.service");
const create_order_item_dto_1 = require("./dto/create-order-item.dto");
const update_order_item_dto_1 = require("./dto/update-order-item.dto");
const swagger_1 = require("@nestjs/swagger");
const order_item_entity_1 = require("./entities/order-item.entity");
let OrderItemsController = class OrderItemsController {
    constructor(orderItemsService) {
        this.orderItemsService = orderItemsService;
    }
    create(createOrderItemDto) {
        return this.orderItemsService.create(createOrderItemDto);
    }
    findAll() {
        return this.orderItemsService.findAll();
    }
    findOne(id) {
        return this.orderItemsService.findOne(id);
    }
    findByOrderId(orderId) {
        return this.orderItemsService.findByOrderId(orderId);
    }
    update(id, updateOrderItemDto) {
        return this.orderItemsService.update(id, updateOrderItemDto);
    }
    remove(id) {
        return this.orderItemsService.remove(id);
    }
};
exports.OrderItemsController = OrderItemsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: "Create a new order item" }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "The order item has been successfully created.",
        type: order_item_entity_1.OrderItem,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_order_item_dto_1.CreateOrderItemDto]),
    __metadata("design:returntype", void 0)
], OrderItemsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "Get all order items" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Return all order items.",
        type: [order_item_entity_1.OrderItem],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OrderItemsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Get an order item by id" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Order item ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Return the order item.",
        type: order_item_entity_1.OrderItem,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Order item not found." }),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], OrderItemsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)("order/:orderId"),
    (0, swagger_1.ApiOperation)({ summary: "Get order items by order ID" }),
    (0, swagger_1.ApiParam)({ name: "orderId", description: "Order ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Return order items for the specified order.",
        type: [order_item_entity_1.OrderItem],
    }),
    __param(0, (0, common_1.Param)("orderId", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], OrderItemsController.prototype, "findByOrderId", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Update an order item" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Order item ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "The order item has been successfully updated.",
        type: order_item_entity_1.OrderItem,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Order item not found." }),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_order_item_dto_1.UpdateOrderItemDto]),
    __metadata("design:returntype", void 0)
], OrderItemsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Delete an order item" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Order item ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "The order item has been successfully deleted.",
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Order item not found." }),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], OrderItemsController.prototype, "remove", null);
exports.OrderItemsController = OrderItemsController = __decorate([
    (0, swagger_1.ApiTags)("order-items"),
    (0, swagger_1.ApiExtraModels)(create_order_item_dto_1.CreateOrderItemDto),
    (0, common_1.Controller)("order-items"),
    __metadata("design:paramtypes", [order_items_service_1.OrderItemsService])
], OrderItemsController);
//# sourceMappingURL=order-items.controller.js.map