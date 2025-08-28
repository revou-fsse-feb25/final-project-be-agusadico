import {
  Controller,
  Post,
  Body,
  Get,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
} from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { CurrentUser } from "./decorators/current-user.decorator";
import { AuthenticatedUser } from "./interfaces/user.interface";
import { Public } from "./decorators/public.decorator";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @Public()
  @ApiOperation({ summary: "User login" })
  @ApiResponse({
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
  })
  @ApiResponse({ status: 401, description: "Invalid credentials" })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post("logout")
  @Public()
  @ApiOperation({ summary: "User logout" })
  @ApiResponse({ status: 200, description: "Logout successful" })
  async logout() {
    return { message: "Logout successful" };
  }

  @Get("check-auth")
  @ApiOperation({ summary: "Check if user is authenticated" })
  @ApiResponse({ status: 200, description: "User is authenticated" })
  async checkAuth(@CurrentUser() user: AuthenticatedUser) {
    return { 
      authenticated: true,
      user: user || { id: 0, email: "guest@example.com", role: "GUEST" }
    };
  }

  @Post("register")
  @ApiOperation({ summary: "User registration" })
  @ApiResponse({
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
  })
  @ApiResponse({ status: 409, description: "User already exists" })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post("change-password")
  @ApiOperation({ summary: "Change user password" })
  @ApiResponse({ status: 200, description: "Password changed successfully" })
  async changePassword(
    @CurrentUser() user: AuthenticatedUser,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return this.authService.changePassword(
      user ? user.id : 1,
      changePasswordDto.oldPassword,
      changePasswordDto.newPassword,
    );
  }

  @Get("profile")
  @ApiOperation({ summary: "Get current user profile" })
  @ApiResponse({ status: 200, description: "User profile retrieved" })
  async getProfile(@CurrentUser() user: AuthenticatedUser) {
    return user || {
      id: 0,
      email: "guest@example.com",
      name: "Guest User",
      customerId: "guest",
      role: "GUEST",
    };
  }

  @Get("admin-only")
  @ApiOperation({ summary: "Admin only endpoint" })
  @ApiResponse({ status: 200, description: "Admin access granted" })
  async adminOnly() {
    return { message: "Admin access granted to everyone in development mode" };
  }
}
