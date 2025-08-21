export interface JwtPayload {
    email: string;
    sub: number;
    role: string;
    customerId: string;
}
export interface AuthenticatedUser {
    id: number;
    email: string;
    name: string;
    customerId: string;
    role: string;
}
export interface UserValidationResult {
    id: number;
    email: string;
    name: string;
    customerId: string;
    role: string;
}
