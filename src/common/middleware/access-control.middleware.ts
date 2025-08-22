import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthenticatedUser } from '../../auth/interfaces/user.interface';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AccessControlMiddleware implements NestMiddleware {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    // Build full path (handles middleware mounted at sub-paths)
    const fullPath = (req.originalUrl || `${req.baseUrl}${req.path || ''}`).split('?')[0];

    // If Authorization header exists, decode the JWT and attach user early
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    if (typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
      const token = authHeader.slice(7);
      try {
        const secret = this.configService.get<string>('JWT_SECRET');
        const payload: any = this.jwtService.verify(token, { secret });

        // Fetch fresh user snapshot from DB (role may have changed)
        const dbUser = await this.prisma.customer.findUnique({
          where: { id: payload.sub },
          select: { id: true, email: true, name: true, customerId: true, role: true },
        });
        if (dbUser) {
          (req as any).user = {
            id: dbUser.id,
            email: dbUser.email,
            name: dbUser.name,
            customerId: dbUser.customerId,
            role: dbUser.role,
          } as AuthenticatedUser;
        }
      } catch (e) {
        // Ignore token errors here; downstream logic will handle as unauthenticated
      }
    }

    // Skip middleware for public routes
    if (this.isPublicRoute(fullPath, req.method)) {
      return next();
    }

    // Get user from request (set by JWT guard)
    const user = req.user as AuthenticatedUser;
    if (!user) {
      throw new ForbiddenException('Authentication required');
    }

    // Admin can access everything
    if (user.role === 'ADMIN') {
      return next();
    }

    // For regular users, check ownership based on route
    const isAllowed = await this.checkOwnership(req, user);
    if (!isAllowed) {
      throw new ForbiddenException('Access denied: You can only access your own resources');
    }

    next();
  }

  private isPublicRoute(path: string, method: string): boolean {
    const publicRoutes = [
      { path: '/auth/login', method: 'POST' },
      { path: '/auth/register', method: 'POST' },
      { path: '/api', method: 'GET' }, // Swagger docs
      { path: '/products', method: 'GET' }, // Public product endpoints (changed from /products/public)
      { path: '/product-relations', method: 'GET' }, // Make product relations readable
      { path: '/contact-submissions', method: 'POST' }, // Allow public submissions
    ];

    return publicRoutes.some(route => 
      path.startsWith(route.path) && method === route.method
    );
  }

  private async checkOwnership(req: Request, user: AuthenticatedUser): Promise<boolean> {
    const method = req.method;
    const path = (req.originalUrl || `${req.baseUrl}${req.path || ''}`).split('?')[0];
    const userId = user.id;

    // Extract resource ID from path
    const resourceId = this.extractResourceId(path);

    // Customers: can only read/update their own profile
    if (path.startsWith('/customers/')) {
      if (method === 'GET' || method === 'PATCH' || method === 'DELETE') {
        return parseInt(resourceId) === userId;
      }
      // POST /customers - only allow if creating their own profile
      if (method === 'POST') {
        const body = req.body as any;
        return body.email === user.email;
      }
    }

    // Orders: only if customerId matches user.id
    if (path.startsWith('/orders/')) {
      if (method === 'GET') {
        if (path.includes('/my-orders')) {
          return true; // This endpoint is specifically for user's own orders
        }
        const order = await this.prisma.order.findUnique({
          where: { id: parseInt(resourceId) },
          select: { customerId: true }
        });
        return order?.customerId === userId;
      }
      if (method === 'POST') {
        const body = req.body as any;
        return body.customerId === userId;
      }
      if (method === 'PATCH' || method === 'DELETE') {
        const order = await this.prisma.order.findUnique({
          where: { id: parseInt(resourceId) },
          select: { customerId: true }
        });
        return order?.customerId === userId;
      }
    }

    // OrderItems: only if related order's customerId matches user.id
    if (path.startsWith('/order-items/')) {
      if (method === 'GET') {
        const orderItem = await this.prisma.orderItem.findUnique({
          where: { id: parseInt(resourceId) },
          include: { order: { select: { customerId: true } } }
        });
        return orderItem?.order?.customerId === userId;
      }
      if (method === 'POST') {
        const body = req.body as any;
        const order = await this.prisma.order.findUnique({
          where: { id: body.orderId },
          select: { customerId: true }
        });
        return order?.customerId === userId;
      }
      if (method === 'PATCH' || method === 'DELETE') {
        const orderItem = await this.prisma.orderItem.findUnique({
          where: { id: parseInt(resourceId) },
          include: { order: { select: { customerId: true } } }
        });
        return orderItem?.order?.customerId === userId;
      }
    }

    // Billings: only if related order's customerId matches user.id
    if (path.startsWith('/billings/')) {
      if (method === 'GET') {
        const billing = await this.prisma.billing.findUnique({
          where: { id: parseInt(resourceId) },
          include: { order: { select: { customerId: true } } }
        });
        return billing?.order?.customerId === userId;
      }
      if (method === 'POST') {
        const body = req.body as any;
        const order = await this.prisma.order.findUnique({
          where: { id: body.orderId },
          select: { customerId: true }
        });
        return order?.customerId === userId;
      }
      if (method === 'PATCH' || method === 'DELETE') {
        const billing = await this.prisma.billing.findUnique({
          where: { id: parseInt(resourceId) },
          include: { order: { select: { customerId: true } } }
        });
        return billing?.order?.customerId === userId;
      }
    }

    // Shippings: only if related order's customerId matches user.id
    if (path.startsWith('/shippings/')) {
      if (method === 'GET') {
        const shipping = await this.prisma.shipping.findUnique({
          where: { id: parseInt(resourceId) },
          include: { order: { select: { customerId: true } } }
        });
        return shipping?.order?.customerId === userId;
      }
      if (method === 'POST') {
        const body = req.body as any;
        const order = await this.prisma.order.findUnique({
          where: { id: body.orderId },
          select: { customerId: true }
        });
        return order?.customerId === userId;
      }
      if (method === 'PATCH' || method === 'DELETE') {
        const shipping = await this.prisma.shipping.findUnique({
          where: { id: parseInt(resourceId) },
          include: { order: { select: { customerId: true } } }
        });
        return shipping?.order?.customerId === userId;
      }
    }

    // LastOrders: only if customerId matches user.id
    if (path.startsWith('/last-orders/')) {
      if (method === 'GET') {
        const lastOrder = await this.prisma.lastOrder.findUnique({
          where: { id: parseInt(resourceId) },
          select: { customerId: true }
        });
        return lastOrder?.customerId === userId;
      }
      if (method === 'POST') {
        const body = req.body as any;
        return body.customerId === userId;
      }
      if (method === 'PATCH' || method === 'DELETE') {
        const lastOrder = await this.prisma.lastOrder.findUnique({
          where: { id: parseInt(resourceId) },
          select: { customerId: true }
        });
        return lastOrder?.customerId === userId;
      }
    }

    // ContactSubmissions: customers only see their own
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
        return submission?.email === user.email;
      }
      if (method === 'POST') {
        const body = req.body as any;
        return body.email === user.email;
      }
      if (method === 'PATCH' || method === 'DELETE') {
        const submission = await this.prisma.contactSubmission.findUnique({
          where: { id: parseInt(resourceId) },
          select: { email: true }
        });
        return submission?.email === user.email;
      }
    }

    // Products & ProductRelations: members read-only
    if (path.startsWith('/products') || path.startsWith('/product-relations')) {
      if (method === 'GET') {
        return true; // Read access allowed for all authenticated users
      }
      // POST, PATCH, DELETE - only admins (handled by role check above)
      return false;
    }

    // Default: deny access for unknown routes
    return false;
  }

  private extractResourceId(path: string): string {
    // Extract ID from paths like /customers/123, /orders/456, etc.
    const parts = path.split('/');
    return parts[parts.length - 1];
  }
}

