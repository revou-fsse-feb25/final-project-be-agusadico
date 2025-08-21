import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../prisma/prisma.service";
import { CreateCustomerDto } from "../customers/dto/create-customer.dto";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { JwtPayload, UserValidationResult } from "./interfaces/user.interface";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserValidationResult | null> {
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

    if (
      user &&
      user.password &&
      (await bcrypt.compare(password, user.password))
    ) {
      const { password: _password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);

    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const payload: JwtPayload = {
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

  async register(registerDto: RegisterDto) {
    // Check if user already exists
    const existingUser = await this.prisma.customer.findUnique({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new ConflictException("User with this email already exists");
    }

    // Hash password
    if (!registerDto.password) {
      throw new ConflictException("Password is required");
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // Generate unique customer ID
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 8).toUpperCase();
    const uniqueCustomerId = `CUST-${timestamp}-${randomSuffix}`;

    // Create user with default role and unique customer ID
    const user = await this.prisma.customer.create({
      data: {
        ...registerDto,
        customerId: uniqueCustomerId, // Use generated unique ID
        password: hashedPassword,
        role: "USER", // Default role
      },
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

  async changePassword(
    userId: number,
    oldPassword: string,
    newPassword: string,
  ) {
    const user = await this.prisma.customer.findUnique({
      where: { id: userId },
      select: { password: true },
    });

    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    if (!user.password) {
      throw new UnauthorizedException("User has no password set");
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid old password");
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await this.prisma.customer.update({
      where: { id: userId },
      data: { password: hashedNewPassword },
    });

    return { message: "Password changed successfully" };
  }
}
