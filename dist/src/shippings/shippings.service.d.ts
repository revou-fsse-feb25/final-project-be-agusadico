import { PrismaService } from "../prisma/prisma.service";
import { CreateShippingDto } from "./dto/create-shipping.dto";
import { UpdateShippingDto } from "./dto/update-shipping.dto";
export declare class ShippingsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createShippingDto: CreateShippingDto): Promise<{
        order: {
            customerId: number | null;
            id: number;
            createdAt: Date;
            orderId: string;
            date: Date;
            bookedAtIso: Date | null;
            customerName: string;
            typeOrder: import(".prisma/client").$Enums.OrderType;
            amount: number;
            status: import(".prisma/client").$Enums.OrderStatus;
            note: string | null;
        };
    } & {
        name: string;
        address: string;
        id: number;
        postalCode: string;
        orderId: number;
    }>;
    findAll(): Promise<({
        order: {
            customerId: number | null;
            id: number;
            createdAt: Date;
            orderId: string;
            date: Date;
            bookedAtIso: Date | null;
            customerName: string;
            typeOrder: import(".prisma/client").$Enums.OrderType;
            amount: number;
            status: import(".prisma/client").$Enums.OrderStatus;
            note: string | null;
        };
    } & {
        name: string;
        address: string;
        id: number;
        postalCode: string;
        orderId: number;
    })[]>;
    findOne(id: number): Promise<{
        order: {
            customerId: number | null;
            id: number;
            createdAt: Date;
            orderId: string;
            date: Date;
            bookedAtIso: Date | null;
            customerName: string;
            typeOrder: import(".prisma/client").$Enums.OrderType;
            amount: number;
            status: import(".prisma/client").$Enums.OrderStatus;
            note: string | null;
        };
    } & {
        name: string;
        address: string;
        id: number;
        postalCode: string;
        orderId: number;
    }>;
    findByOrderId(orderId: number): Promise<({
        order: {
            customerId: number | null;
            id: number;
            createdAt: Date;
            orderId: string;
            date: Date;
            bookedAtIso: Date | null;
            customerName: string;
            typeOrder: import(".prisma/client").$Enums.OrderType;
            amount: number;
            status: import(".prisma/client").$Enums.OrderStatus;
            note: string | null;
        };
    } & {
        name: string;
        address: string;
        id: number;
        postalCode: string;
        orderId: number;
    }) | null>;
    update(id: number, updateShippingDto: UpdateShippingDto): Promise<{
        order: {
            customerId: number | null;
            id: number;
            createdAt: Date;
            orderId: string;
            date: Date;
            bookedAtIso: Date | null;
            customerName: string;
            typeOrder: import(".prisma/client").$Enums.OrderType;
            amount: number;
            status: import(".prisma/client").$Enums.OrderStatus;
            note: string | null;
        };
    } & {
        name: string;
        address: string;
        id: number;
        postalCode: string;
        orderId: number;
    }>;
    remove(id: number): Promise<{
        id: number;
        deleted: boolean;
    }>;
}
