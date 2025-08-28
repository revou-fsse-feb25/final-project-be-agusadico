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
exports.OrdersController = void 0;
const common_1 = require("@nestjs/common");
const orders_service_1 = require("./orders.service");
const create_order_dto_1 = require("./dto/create-order.dto");
const update_order_dto_1 = require("./dto/update-order.dto");
const swagger_1 = require("@nestjs/swagger");
const order_entity_1 = require("./entities/order.entity");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
let OrdersController = class OrdersController {
    constructor(ordersService) {
        this.ordersService = ordersService;
    }
    create(createOrderDto, user) {
        return this.ordersService.create(createOrderDto, user ? user.id : 1);
    }
    findAll() {
        return this.ordersService.findAll();
    }
    findOne(id, user) {
        return this.ordersService.findOne(id, user);
    }
    findByOrderId(orderId, user) {
        return this.ordersService.findByOrderId(orderId, user);
    }
    findMyOrders(user) {
        return this.ordersService.findMyOrders(user ? user.id : 1);
    }
    update(id, updateOrderDto, user) {
        return this.ordersService.update(id, updateOrderDto, user);
    }
    remove(id, user) {
        return this.ordersService.remove(id, user);
    }
};
exports.OrdersController = OrdersController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: "Create a new order" }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "The order has been successfully created.",
        type: order_entity_1.Order,
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_order_dto_1.CreateOrderDto, Object]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "Get all orders" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Return all orders.",
        type: [order_entity_1.Order],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Get an order by id" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Order ID" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Return the order.", type: order_entity_1.Order }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Order not found." }),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)("order-id/:orderId"),
    (0, swagger_1.ApiOperation)({ summary: "Get an order by orderId" }),
    (0, swagger_1.ApiParam)({ name: "orderId", description: "Order unique identifier" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Return the order.", type: order_entity_1.Order }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Order not found." }),
    __param(0, (0, common_1.Param)("orderId")),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "findByOrderId", null);
__decorate([
    (0, common_1.Get)("my-orders"),
    (0, swagger_1.ApiOperation)({ summary: "Get current user's orders" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Return user's orders.",
        type: [order_entity_1.Order],
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "findMyOrders", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Update an order" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Order ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "The order has been successfully updated.",
        type: order_entity_1.Order,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Order not found." }),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_order_dto_1.UpdateOrderDto, Object]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Delete an order" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Order ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "The order has been successfully deleted.",
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Order not found." }),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "remove", null);
exports.OrdersController = OrdersController = __decorate([
    (0, swagger_1.ApiTags)("orders"),
    (0, common_1.Controller)("orders"),
    __metadata("design:paramtypes", [orders_service_1.OrdersService])
], OrdersController);
//# sourceMappingURL=orders.controller.js.map