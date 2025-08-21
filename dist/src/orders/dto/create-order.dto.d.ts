import { OrderType, OrderStatus } from "@prisma/client";
import { CreateBillingDto } from "../../billings/dto/create-billing.dto";
import { CreateShippingDto } from "../../shippings/dto/create-shipping.dto";
declare class CreateOrderItemForOrderDto {
    name: string;
    image: string;
    quantity: number;
    price: number;
    category?: string;
    productId?: number;
}
export declare class CreateOrderDto {
    orderId: string;
    date?: string;
    bookedAtIso?: string;
    customerName: string;
    typeOrder: OrderType;
    amount: number;
    status: OrderStatus;
    note?: string;
    customerId?: number;
    items?: CreateOrderItemForOrderDto[];
    billing?: CreateBillingDto;
    shipping?: CreateShippingDto;
}
export {};
