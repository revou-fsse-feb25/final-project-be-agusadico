export declare class CreateProductDto {
    name: string;
    category: string;
    price: number;
    originalPrice?: number;
    discount?: string;
    image: string;
    description?: string;
    features?: string[];
    sku?: string;
    rating?: number;
    reviewCount?: number;
    inStock?: boolean;
    slug?: string;
    categories?: string[];
    galleryImages?: string[];
    tags?: string[];
}
