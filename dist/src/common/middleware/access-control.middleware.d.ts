import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
export declare class AccessControlMiddleware implements NestMiddleware {
    private readonly prisma;
    private readonly jwtService;
    private readonly configService;
    constructor(prisma: PrismaService, jwtService: JwtService, configService: ConfigService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
    private isPublicRoute;
    private checkOwnership;
    private extractResourceId;
}
