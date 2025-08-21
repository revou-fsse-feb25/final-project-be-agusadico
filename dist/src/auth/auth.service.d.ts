import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../prisma/prisma.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { UserValidationResult } from "./interfaces/user.interface";
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<UserValidationResult | null>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: number;
            email: string;
            name: string;
            customerId: string;
            role: string;
        };
    }>;
    register(registerDto: RegisterDto): Promise<{
        message: string;
        user: {
            customerId: string;
            name: string;
            email: string;
            role: import(".prisma/client").$Enums.UserRole;
            id: number;
            createdAt: Date;
        };
    }>;
    changePassword(userId: number, oldPassword: string, newPassword: string): Promise<{
        message: string;
    }>;
}
