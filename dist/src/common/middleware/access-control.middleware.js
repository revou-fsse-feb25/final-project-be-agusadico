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
exports.AccessControlMiddleware = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let AccessControlMiddleware = class AccessControlMiddleware {
    constructor(prisma, jwtService, configService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async use(req, res, next) {
        const fullPath = (req.originalUrl || `${req.baseUrl}${req.path || ''}`).split('?')[0];
        const authHeader = req.headers['authorization'] || req.headers['Authorization'];
        if (typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
            const token = authHeader.slice(7);
            try {
                const secret = this.configService.get('JWT_SECRET');
                const payload = this.jwtService.verify(token, { secret });
                const dbUser = await this.prisma.customer.findUnique({
                    where: { id: payload.sub },
                    select: { id: true, email: true, name: true, customerId: true, role: true },
                });
                if (dbUser) {
                    req.user = {
                        id: dbUser.id,
                        email: dbUser.email,
                        name: dbUser.name,
                        customerId: dbUser.customerId,
                        role: dbUser.role,
                    };
                }
            }
            catch (e) {
            }
        }
        if (this.isPublicRoute(fullPath, req.method)) {
            return next();
        }
        const user = req.user;
        if (!user) {
            throw new common_1.ForbiddenException('Authentication required');
        }
        if (user.role === 'ADMIN') {
            return next();
        }
        const isAllowed = await this.checkOwnership(req, user);
        if (!isAllowed) {
            throw new common_1.ForbiddenException('Access denied: You can only access your own resources');
        }
        next();
    }
    isPublicRoute(path, method) {
        const publicRoutes = [
            { path: '/auth/login', method: 'POST' },
            { path: '/auth/register', method: 'POST' },
            { path: '/api', method: 'GET' },
            { path: '/products', method: 'GET' },
            { path: '/product-relations', method: 'GET' },
            { path: '/contact-submissions', method: 'POST' },
        ];
        return publicRoutes.some(route => path.startsWith(route.path) && method === route.method);
    }
    async checkOwnership(req, user) {
        var _a, _b, _c, _d, _e, _f;
        const method = req.method;
        const path = (req.originalUrl || `${req.baseUrl}${req.path || ''}`).split('?')[0];
        const userId = user.id;
        const resourceId = this.extractResourceId(path);
        if (path.startsWith('/customers/')) {
            if (method === 'GET' || method === 'PATCH' || method === 'DELETE') {
                return parseInt(resourceId) === userId;
            }
            if (method === 'POST') {
                const body = req.body;
                return body.email === user.email;
            }
        }
        if (path.startsWith('/orders/')) {
            if (method === 'GET') {
                if (path.includes('/my-orders')) {
                    return true;
                }
                const order = await this.prisma.order.findUnique({
                    where: { id: parseInt(resourceId) },
                    select: { customerId: true }
                });
                return (order === null || order === void 0 ? void 0 : order.customerId) === userId;
            }
            if (method === 'POST') {
                const body = req.body;
                return body.customerId === userId;
            }
            if (method === 'PATCH' || method === 'DELETE') {
                const order = await this.prisma.order.findUnique({
                    where: { id: parseInt(resourceId) },
                    select: { customerId: true }
                });
                return (order === null || order === void 0 ? void 0 : order.customerId) === userId;
            }
        }
        if (path.startsWith('/order-items/')) {
            if (method === 'GET') {
                const orderItem = await this.prisma.orderItem.findUnique({
                    where: { id: parseInt(resourceId) },
                    include: { order: { select: { customerId: true } } }
                });
                return ((_a = orderItem === null || orderItem === void 0 ? void 0 : orderItem.order) === null || _a === void 0 ? void 0 : _a.customerId) === userId;
            }
            if (method === 'POST') {
                const body = req.body;
                const order = await this.prisma.order.findUnique({
                    where: { id: body.orderId },
                    select: { customerId: true }
                });
                return (order === null || order === void 0 ? void 0 : order.customerId) === userId;
            }
            if (method === 'PATCH' || method === 'DELETE') {
                const orderItem = await this.prisma.orderItem.findUnique({
                    where: { id: parseInt(resourceId) },
                    include: { order: { select: { customerId: true } } }
                });
                return ((_b = orderItem === null || orderItem === void 0 ? void 0 : orderItem.order) === null || _b === void 0 ? void 0 : _b.customerId) === userId;
            }
        }
        if (path.startsWith('/billings/')) {
            if (method === 'GET') {
                const billing = await this.prisma.billing.findUnique({
                    where: { id: parseInt(resourceId) },
                    include: { order: { select: { customerId: true } } }
                });
                return ((_c = billing === null || billing === void 0 ? void 0 : billing.order) === null || _c === void 0 ? void 0 : _c.customerId) === userId;
            }
            if (method === 'POST') {
                const body = req.body;
                const order = await this.prisma.order.findUnique({
                    where: { id: body.orderId },
                    select: { customerId: true }
                });
                return (order === null || order === void 0 ? void 0 : order.customerId) === userId;
            }
            if (method === 'PATCH' || method === 'DELETE') {
                const billing = await this.prisma.billing.findUnique({
                    where: { id: parseInt(resourceId) },
                    include: { order: { select: { customerId: true } } }
                });
                return ((_d = billing === null || billing === void 0 ? void 0 : billing.order) === null || _d === void 0 ? void 0 : _d.customerId) === userId;
            }
        }
        if (path.startsWith('/shippings/')) {
            if (method === 'GET') {
                const shipping = await this.prisma.shipping.findUnique({
                    where: { id: parseInt(resourceId) },
                    include: { order: { select: { customerId: true } } }
                });
                return ((_e = shipping === null || shipping === void 0 ? void 0 : shipping.order) === null || _e === void 0 ? void 0 : _e.customerId) === userId;
            }
            if (method === 'POST') {
                const body = req.body;
                const order = await this.prisma.order.findUnique({
                    where: { id: body.orderId },
                    select: { customerId: true }
                });
                return (order === null || order === void 0 ? void 0 : order.customerId) === userId;
            }
            if (method === 'PATCH' || method === 'DELETE') {
                const shipping = await this.prisma.shipping.findUnique({
                    where: { id: parseInt(resourceId) },
                    include: { order: { select: { customerId: true } } }
                });
                return ((_f = shipping === null || shipping === void 0 ? void 0 : shipping.order) === null || _f === void 0 ? void 0 : _f.customerId) === userId;
            }
        }
        if (path.startsWith('/last-orders/')) {
            if (method === 'GET') {
                const lastOrder = await this.prisma.lastOrder.findUnique({
                    where: { id: parseInt(resourceId) },
                    select: { customerId: true }
                });
                return (lastOrder === null || lastOrder === void 0 ? void 0 : lastOrder.customerId) === userId;
            }
            if (method === 'POST') {
                const body = req.body;
                return body.customerId === userId;
            }
            if (method === 'PATCH' || method === 'DELETE') {
                const lastOrder = await this.prisma.lastOrder.findUnique({
                    where: { id: parseInt(resourceId) },
                    select: { customerId: true }
                });
                return (lastOrder === null || lastOrder === void 0 ? void 0 : lastOrder.customerId) === userId;
            }
        }
        if (path.startsWith('/contact-submissions/')) {
            if (method === 'GET') {
                if (path.includes('/email/')) {
                    const email = path.split('/email/')[1];
                    return email === user.email;
                }
                const submission = await this.prisma.contactSubmission.findUnique({
                    where: { id: parseInt(resourceId) },
                    select: { email: true }
                });
                return (submission === null || submission === void 0 ? void 0 : submission.email) === user.email;
            }
            if (method === 'POST') {
                const body = req.body;
                return body.email === user.email;
            }
            if (method === 'PATCH' || method === 'DELETE') {
                const submission = await this.prisma.contactSubmission.findUnique({
                    where: { id: parseInt(resourceId) },
                    select: { email: true }
                });
                return (submission === null || submission === void 0 ? void 0 : submission.email) === user.email;
            }
        }
        if (path.startsWith('/products') || path.startsWith('/product-relations')) {
            if (method === 'GET') {
                return true;
            }
            return false;
        }
        return false;
    }
    extractResourceId(path) {
        const parts = path.split('/');
        return parts[parts.length - 1];
    }
};
exports.AccessControlMiddleware = AccessControlMiddleware;
exports.AccessControlMiddleware = AccessControlMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AccessControlMiddleware);
//# sourceMappingURL=access-control.middleware.js.map