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
exports.BillingsController = void 0;
const common_1 = require("@nestjs/common");
const billings_service_1 = require("./billings.service");
const create_billing_dto_1 = require("./dto/create-billing.dto");
const update_billing_dto_1 = require("./dto/update-billing.dto");
const swagger_1 = require("@nestjs/swagger");
const billing_entity_1 = require("./entities/billing.entity");
let BillingsController = class BillingsController {
    constructor(billingsService) {
        this.billingsService = billingsService;
    }
    create(createBillingDto) {
        return this.billingsService.create(createBillingDto);
    }
    findAll() {
        return this.billingsService.findAll();
    }
    findOne(id) {
        return this.billingsService.findOne(id);
    }
    findByOrderId(orderId) {
        return this.billingsService.findByOrderId(orderId);
    }
    update(id, updateBillingDto) {
        return this.billingsService.update(id, updateBillingDto);
    }
    remove(id) {
        return this.billingsService.remove(id);
    }
};
exports.BillingsController = BillingsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: "Create a new billing" }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "The billing has been successfully created.",
        type: billing_entity_1.Billing,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_billing_dto_1.CreateBillingDto]),
    __metadata("design:returntype", void 0)
], BillingsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "Get all billings" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Return all billings.",
        type: [billing_entity_1.Billing],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BillingsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Get a billing by id" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Billing ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Return the billing.",
        type: billing_entity_1.Billing,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Billing not found." }),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BillingsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)("order/:orderId"),
    (0, swagger_1.ApiOperation)({ summary: "Get billing by order ID" }),
    (0, swagger_1.ApiParam)({ name: "orderId", description: "Order ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Return billing for the specified order.",
        type: billing_entity_1.Billing,
    }),
    __param(0, (0, common_1.Param)("orderId", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BillingsController.prototype, "findByOrderId", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Update a billing" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Billing ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "The billing has been successfully updated.",
        type: billing_entity_1.Billing,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Billing not found." }),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_billing_dto_1.UpdateBillingDto]),
    __metadata("design:returntype", void 0)
], BillingsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Delete a billing" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Billing ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "The billing has been successfully deleted.",
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Billing not found." }),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BillingsController.prototype, "remove", null);
exports.BillingsController = BillingsController = __decorate([
    (0, swagger_1.ApiTags)("billings"),
    (0, swagger_1.ApiExtraModels)(create_billing_dto_1.CreateBillingDto),
    (0, common_1.Controller)("billings"),
    __metadata("design:paramtypes", [billings_service_1.BillingsService])
], BillingsController);
//# sourceMappingURL=billings.controller.js.map