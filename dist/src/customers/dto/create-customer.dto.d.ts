export declare class CreateCustomerDto {
    customerId: string;
    name: string;
    email: string;
    password?: string;
    username?: string;
    phone?: string;
    address?: string;
    city?: string;
    birthday?: string;
    image?: string;
    location?: string;
    totalSpent?: number;
    role?: "USER" | "ADMIN";
}
