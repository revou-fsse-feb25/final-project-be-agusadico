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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async validateUser(email, password) {
        const user = await this.prisma.customer.findUnique({
            where: { email },
            select: {
                id: true,
                email: true,
                password: true,
                name: true,
                customerId: true,
                role: true,
            },
        });
        if (user &&
            user.password &&
            (await bcrypt.compare(password, user.password))) {
            const { password: _password } = user, result = __rest(user, ["password"]);
            return result;
        }
        return null;
    }
    async login(loginDto) {
        const user = await this.validateUser(loginDto.email, loginDto.password);
        if (!user) {
            throw new common_1.UnauthorizedException("Invalid credentials");
        }
        const payload = {
            email: user.email,
            sub: user.id,
            role: user.role,
            customerId: user.customerId,
        };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                customerId: user.customerId,
                role: user.role,
            },
        };
    }
    async register(registerDto) {
        const existingUser = await this.prisma.customer.findUnique({
            where: { email: registerDto.email },
        });
        if (existingUser) {
            throw new common_1.ConflictException("User with this email already exists");
        }
        if (!registerDto.password) {
            throw new common_1.ConflictException("Password is required");
        }
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);
        const timestamp = Date.now();
        const randomSuffix = Math.random().toString(36).substring(2, 8).toUpperCase();
        const uniqueCustomerId = `CUST-${timestamp}-${randomSuffix}`;
        const user = await this.prisma.customer.create({
            data: Object.assign(Object.assign({}, registerDto), { customerId: uniqueCustomerId, password: hashedPassword, role: "USER" }),
            select: {
                id: true,
                email: true,
                name: true,
                customerId: true,
                role: true,
                createdAt: true,
            },
        });
        return {
            message: "User registered successfully",
            user,
        };
    }
    async changePassword(userId, oldPassword, newPassword) {
        const user = await this.prisma.customer.findUnique({
            where: { id: userId },
            select: { password: true },
        });
        if (!user) {
            throw new common_1.UnauthorizedException("User not found");
        }
        if (!user.password) {
            throw new common_1.UnauthorizedException("User has no password set");
        }
        const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException("Invalid old password");
        }
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        await this.prisma.customer.update({
            where: { id: userId },
            data: { password: hashedNewPassword },
        });
        return { message: "Password changed successfully" };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map