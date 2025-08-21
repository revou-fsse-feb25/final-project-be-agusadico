import { OrderItemsService } from "./order-items.service";
import { CreateOrderItemDto } from "./dto/create-order-item.dto";
import { UpdateOrderItemDto } from "./dto/update-order-item.dto";
export declare class OrderItemsController {
    private readonly orderItemsService;
    constructor(orderItemsService: OrderItemsService);
    create(createOrderItemDto: CreateOrderItemDto): Promise<{
        product: {
            description: string | null;
            name: string;
            image: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            tags: string[];
            category: string;
            price: number;
            originalPrice: number | null;
            discount: string | null;
            features: string[];
            sku: string | null;
            rating: number | null;
            reviewCount: number | null;
            inStock: boolean;
            slug: string | null;
            categories: string[];
            galleryImages: string[];
        } | null;
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
        image: string;
        id: number;
        category: string | null;
        price: number;
        productId: number | null;
        orderId: number;
        quantity: number;
    }>;
    findAll(): Promise<({
        product: {
            description: string | null;
            name: string;
            image: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            tags: string[];
            category: string;
            price: number;
            originalPrice: number | null;
            discount: string | null;
            features: string[];
            sku: string | null;
            rating: number | null;
            reviewCount: number | null;
            inStock: boolean;
            slug: string | null;
            categories: string[];
            galleryImages: string[];
        } | null;
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
        image: string;
        id: number;
        category: string | null;
        price: number;
        productId: number | null;
        orderId: number;
        quantity: number;
    })[]>;
    findOne(id: number): Promise<{
        product: {
            description: string | null;
            name: string;
            image: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            tags: string[];
            category: string;
            price: number;
            originalPrice: number | null;
            discount: string | null;
            features: string[];
            sku: string | null;
            rating: number | null;
            reviewCount: number | null;
            inStock: boolean;
            slug: string | null;
            categories: string[];
            galleryImages: string[];
        } | null;
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
        image: string;
        id: number;
        category: string | null;
        price: number;
        productId: number | null;
        orderId: number;
        quantity: number;
    }>;
    findByOrderId(orderId: number): Promise<({
        product: {
            description: string | null;
            name: string;
            image: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            tags: string[];
            category: string;
            price: number;
            originalPrice: number | null;
            discount: string | null;
            features: string[];
            sku: string | null;
            rating: number | null;
            reviewCount: number | null;
            inStock: boolean;
            slug: string | null;
            categories: string[];
            galleryImages: string[];
        } | null;
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
        image: string;
        id: number;
        category: string | null;
        price: number;
        productId: number | null;
        orderId: number;
        quantity: number;
    })[]>;
    update(id: number, updateOrderItemDto: UpdateOrderItemDto): Promise<{
        product: {
            description: string | null;
            name: string;
            image: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            tags: string[];
            category: string;
            price: number;
            originalPrice: number | null;
            discount: string | null;
            features: string[];
            sku: string | null;
            rating: number | null;
            reviewCount: number | null;
            inStock: boolean;
            slug: string | null;
            categories: string[];
            galleryImages: string[];
        } | null;
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
        image: string;
        id: number;
        category: string | null;
        price: number;
        productId: number | null;
        orderId: number;
        quantity: number;
    }>;
    remove(id: number): Promise<{
        id: number;
        deleted: boolean;
    }>;
}
