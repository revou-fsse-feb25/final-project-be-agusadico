import { PrismaService } from "../prisma/prisma.service";
import { CreateLastOrderDto } from "./dto/create-last-order.dto";
import { UpdateLastOrderDto } from "./dto/update-last-order.dto";
export declare class LastOrdersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createLastOrderDto: CreateLastOrderDto): Promise<{
        customer: {
            customerId: string;
            name: string;
            email: string;
            password: string | null;
            username: string | null;
            phone: string | null;
            address: string | null;
            city: string | null;
            birthday: Date | null;
            image: string | null;
            location: string | null;
            totalSpent: number;
            role: import(".prisma/client").$Enums.UserRole;
            id: number;
            joinDate: Date;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        customerId: number;
        id: number;
        date: Date;
        amount: number;
    }>;
    findAll(): Promise<({
        customer: {
            customerId: string;
            name: string;
            email: string;
            password: string | null;
            username: string | null;
            phone: string | null;
            address: string | null;
            city: string | null;
            birthday: Date | null;
            image: string | null;
            location: string | null;
            totalSpent: number;
            role: import(".prisma/client").$Enums.UserRole;
            id: number;
            joinDate: Date;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        customerId: number;
        id: number;
        date: Date;
        amount: number;
    })[]>;
    findOne(id: number): Promise<{
        customer: {
            customerId: string;
            name: string;
            email: string;
            password: string | null;
            username: string | null;
            phone: string | null;
            address: string | null;
            city: string | null;
            birthday: Date | null;
            image: string | null;
            location: string | null;
            totalSpent: number;
            role: import(".prisma/client").$Enums.UserRole;
            id: number;
            joinDate: Date;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        customerId: number;
        id: number;
        date: Date;
        amount: number;
    }>;
    findByCustomerId(customerId: number): Promise<({
        customer: {
            customerId: string;
            name: string;
            email: string;
            password: string | null;
            username: string | null;
            phone: string | null;
            address: string | null;
            city: string | null;
            birthday: Date | null;
            image: string | null;
            location: string | null;
            totalSpent: number;
            role: import(".prisma/client").$Enums.UserRole;
            id: number;
            joinDate: Date;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        customerId: number;
        id: number;
        date: Date;
        amount: number;
    }) | null>;
    update(id: number, updateLastOrderDto: UpdateLastOrderDto): Promise<{
        customer: {
            customerId: string;
            name: string;
            email: string;
            password: string | null;
            username: string | null;
            phone: string | null;
            address: string | null;
            city: string | null;
            birthday: Date | null;
            image: string | null;
            location: string | null;
            totalSpent: number;
            role: import(".prisma/client").$Enums.UserRole;
            id: number;
            joinDate: Date;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        customerId: number;
        id: number;
        date: Date;
        amount: number;
    }>;
    remove(id: number): Promise<{
        id: number;
        deleted: boolean;
    }>;
}
