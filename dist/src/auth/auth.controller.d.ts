import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { AuthenticatedUser } from "./interfaces/user.interface";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
    logout(): Promise<{
        message: string;
    }>;
    checkAuth(user: AuthenticatedUser): Promise<{
        authenticated: boolean;
        user: AuthenticatedUser;
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
    changePassword(user: AuthenticatedUser, changePasswordDto: ChangePasswordDto): Promise<{
        message: string;
    }>;
    getProfile(user: AuthenticatedUser): Promise<AuthenticatedUser>;
    adminOnly(): Promise<{
        message: string;
    }>;
}
