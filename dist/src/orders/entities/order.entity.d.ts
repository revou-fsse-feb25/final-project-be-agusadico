import { OrderType, OrderStatus } from "@prisma/client";
declare class OrderItem {
    id: number;
    name: string;
    image: string;
    quantity: number;
    price: number;
    category?: string;
    orderId: number;
    productId?: number;
}
declare class Billing {
    id: number;
    name: string;
    address: string;
    postalCode: string;
    orderId: number;
}
declare class Shipping {
    id: number;
    name: string;
    address: string;
    postalCode: string;
    orderId: number;
}
export declare class Order {
    id: number;
    orderId: string;
    date: Date;
    createdAt: Date;
    bookedAtIso?: Date;
    customerName: string;
    typeOrder: OrderType;
    amount: number;
    status: OrderStatus;
    note?: string;
    items?: OrderItem[];
    customerId?: number;
    billing?: Billing;
    shipping?: Shipping;
}
export {};
