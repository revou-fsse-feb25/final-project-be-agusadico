import { PrismaService } from "../prisma/prisma.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { AuthenticatedUser } from "../auth/interfaces/user.interface";
export declare class OrdersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createOrderDto: CreateOrderDto, userId: number): Promise<{
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
        } | null;
        billing: {
            name: string;
            address: string;
            id: number;
            postalCode: string;
            orderId: number;
        } | null;
        shipping: {
            name: string;
            address: string;
            id: number;
            postalCode: string;
            orderId: number;
        } | null;
        items: {
            name: string;
            image: string;
            id: number;
            category: string | null;
            price: number;
            productId: number | null;
            orderId: number;
            quantity: number;
        }[];
    } & {
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
        } | null;
        billing: {
            name: string;
            address: string;
            id: number;
            postalCode: string;
            orderId: number;
        } | null;
        shipping: {
            name: string;
            address: string;
            id: number;
            postalCode: string;
            orderId: number;
        } | null;
        items: {
            name: string;
            image: string;
            id: number;
            category: string | null;
            price: number;
            productId: number | null;
            orderId: number;
            quantity: number;
        }[];
    } & {
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
    })[]>;
    findMyOrders(userId: number): Promise<({
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
        } | null;
        billing: {
            name: string;
            address: string;
            id: number;
            postalCode: string;
            orderId: number;
        } | null;
        shipping: {
            name: string;
            address: string;
            id: number;
            postalCode: string;
            orderId: number;
        } | null;
        items: {
            name: string;
            image: string;
            id: number;
            category: string | null;
            price: number;
            productId: number | null;
            orderId: number;
            quantity: number;
        }[];
    } & {
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
    })[]>;
    findOne(id: number, user: AuthenticatedUser): Promise<{
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
        } | null;
        billing: {
            name: string;
            address: string;
            id: number;
            postalCode: string;
            orderId: number;
        } | null;
        shipping: {
            name: string;
            address: string;
            id: number;
            postalCode: string;
            orderId: number;
        } | null;
        items: {
            name: string;
            image: string;
            id: number;
            category: string | null;
            price: number;
            productId: number | null;
            orderId: number;
            quantity: number;
        }[];
    } & {
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
    }>;
    findByOrderId(orderId: string, user: AuthenticatedUser): Promise<{
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
        } | null;
        billing: {
            name: string;
            address: string;
            id: number;
            postalCode: string;
            orderId: number;
        } | null;
        shipping: {
            name: string;
            address: string;
            id: number;
            postalCode: string;
            orderId: number;
        } | null;
        items: {
            name: string;
            image: string;
            id: number;
            category: string | null;
            price: number;
            productId: number | null;
            orderId: number;
            quantity: number;
        }[];
    } & {
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
    }>;
    update(id: number, updateOrderDto: UpdateOrderDto, user: AuthenticatedUser): Promise<{
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
        } | null;
        billing: {
            name: string;
            address: string;
            id: number;
            postalCode: string;
            orderId: number;
        } | null;
        shipping: {
            name: string;
            address: string;
            id: number;
            postalCode: string;
            orderId: number;
        } | null;
        items: {
            name: string;
            image: string;
            id: number;
            category: string | null;
            price: number;
            productId: number | null;
            orderId: number;
            quantity: number;
        }[];
    } & {
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
    }>;
    remove(id: number, user: AuthenticatedUser): Promise<{
        id: number;
        deleted: boolean;
    }>;
}
