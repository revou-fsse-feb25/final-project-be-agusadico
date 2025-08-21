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
exports.CustomersController = void 0;
const common_1 = require("@nestjs/common");
const customers_service_1 = require("./customers.service");
const create_customer_dto_1 = require("./dto/create-customer.dto");
const update_customer_dto_1 = require("./dto/update-customer.dto");
const update_role_dto_1 = require("./dto/update-role.dto");
const swagger_1 = require("@nestjs/swagger");
const customer_entity_1 = require("./entities/customer.entity");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
let CustomersController = class CustomersController {
    constructor(customersService) {
        this.customersService = customersService;
    }
    create(createCustomerDto) {
        return this.customersService.create(createCustomerDto);
    }
    findAll() {
        return this.customersService.findAll();
    }
    findOne(id) {
        return this.customersService.findOne(id);
    }
    findByCustomerId(customerId) {
        return this.customersService.findByCustomerId(customerId);
    }
    update(id, updateCustomerDto, user) {
        return this.customersService.update(id, updateCustomerDto, user);
    }
    updateRole(id, updateRoleDto, user) {
        return this.customersService.updateRole(id, updateRoleDto);
    }
    remove(id) {
        return this.customersService.remove(id);
    }
};
exports.CustomersController = CustomersController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: "Create a new customer" }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "The customer has been successfully created.",
        type: customer_entity_1.Customer,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_customer_dto_1.CreateCustomerDto]),
    __metadata("design:returntype", void 0)
], CustomersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "Get all customers" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Return all customers.",
        type: [customer_entity_1.Customer],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CustomersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Get a customer by id" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Customer ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Return the customer.",
        type: customer_entity_1.Customer,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Customer not found." }),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CustomersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)("customer-id/:customerId"),
    (0, swagger_1.ApiOperation)({ summary: "Get a customer by customerId" }),
    (0, swagger_1.ApiParam)({ name: "customerId", description: "Customer unique identifier" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Return the customer.",
        type: customer_entity_1.Customer,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Customer not found." }),
    __param(0, (0, common_1.Param)("customerId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CustomersController.prototype, "findByCustomerId", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)("JWT-auth"),
    (0, swagger_1.ApiOperation)({ summary: "Update a customer" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Customer ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "The customer has been successfully updated.",
        type: customer_entity_1.Customer,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Customer not found." }),
    (0, common_1.Patch)(":id"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)("ADMIN"),
    (0, swagger_1.ApiBearerAuth)("JWT-auth"),
    (0, swagger_1.ApiOperation)({ summary: "Update a customer (Admin only)" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Customer ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "The customer has been successfully updated.",
        type: customer_entity_1.Customer,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Customer not found." }),
    (0, swagger_1.ApiResponse)({ status: 403, description: "Forbidden - Admin access required." }),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_customer_dto_1.UpdateCustomerDto, Object]),
    __metadata("design:returntype", void 0)
], CustomersController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(":id/role"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)("ADMIN"),
    (0, swagger_1.ApiBearerAuth)("JWT-auth"),
    (0, swagger_1.ApiOperation)({ summary: "Update customer role (Admin only)" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Customer ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "The customer role has been successfully updated.",
        type: customer_entity_1.Customer,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Customer not found." }),
    (0, swagger_1.ApiResponse)({ status: 403, description: "Forbidden - Admin access required." }),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_role_dto_1.UpdateRoleDto, Object]),
    __metadata("design:returntype", void 0)
], CustomersController.prototype, "updateRole", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Delete a customer" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Customer ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "The customer has been successfully deleted.",
        type: customer_entity_1.Customer,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Customer not found." }),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CustomersController.prototype, "remove", null);
exports.CustomersController = CustomersController = __decorate([
    (0, swagger_1.ApiTags)("customers"),
    (0, common_1.Controller)("customers"),
    __metadata("design:paramtypes", [customers_service_1.CustomersService])
], CustomersController);
//# sourceMappingURL=customers.controller.js.map