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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("./auth.service");
const login_dto_1 = require("./dto/login.dto");
const register_dto_1 = require("./dto/register.dto");
const change_password_dto_1 = require("./dto/change-password.dto");
const current_user_decorator_1 = require("./decorators/current-user.decorator");
const public_decorator_1 = require("./decorators/public.decorator");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(loginDto) {
        return this.authService.login(loginDto);
    }
    async logout() {
        return { message: "Logout successful" };
    }
    async checkAuth(user) {
        return {
            authenticated: true,
            user: user || { id: 0, email: "guest@example.com", role: "GUEST" }
        };
    }
    async register(registerDto) {
        return this.authService.register(registerDto);
    }
    async changePassword(user, changePasswordDto) {
        return this.authService.changePassword(user ? user.id : 1, changePasswordDto.oldPassword, changePasswordDto.newPassword);
    }
    async getProfile(user) {
        return user || {
            id: 0,
            email: "guest@example.com",
            name: "Guest User",
            customerId: "guest",
            role: "GUEST",
        };
    }
    async adminOnly() {
        return { message: "Admin access granted to everyone in development mode" };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)("login"),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: "User login" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Login successful",
        schema: {
            type: "object",
            properties: {
                access_token: { type: "string" },
                user: {
                    type: "object",
                    properties: {
                        id: { type: "number" },
                        email: { type: "string" },
                        name: { type: "string" },
                        customerId: { type: "string" },
                        role: { type: "string" },
                    },
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "Invalid credentials" }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)("logout"),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: "User logout" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Logout successful" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Get)("check-auth"),
    (0, swagger_1.ApiOperation)({ summary: "Check if user is authenticated" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "User is authenticated" }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "checkAuth", null);
__decorate([
    (0, common_1.Post)("register"),
    (0, swagger_1.ApiOperation)({ summary: "User registration" }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "User registered successfully",
        schema: {
            type: "object",
            properties: {
                message: { type: "string" },
                user: {
                    type: "object",
                    properties: {
                        id: { type: "number" },
                        email: { type: "string" },
                        name: { type: "string" },
                        customerId: { type: "string" },
                        role: { type: "string" },
                        createdAt: { type: "string" },
                    },
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 409, description: "User already exists" }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)("change-password"),
    (0, swagger_1.ApiOperation)({ summary: "Change user password" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Password changed successfully" }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, change_password_dto_1.ChangePasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Get)("profile"),
    (0, swagger_1.ApiOperation)({ summary: "Get current user profile" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "User profile retrieved" }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Get)("admin-only"),
    (0, swagger_1.ApiOperation)({ summary: "Admin only endpoint" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Admin access granted" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "adminOnly", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)("auth"),
    (0, common_1.Controller)("auth"),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map