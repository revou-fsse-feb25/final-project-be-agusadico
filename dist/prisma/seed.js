"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    await prisma.orderItem.deleteMany();
    await prisma.billing.deleteMany();
    await prisma.shipping.deleteMany();
    await prisma.order.deleteMany();
    await prisma.lastOrder.deleteMany();
    await prisma.productRelation.deleteMany();
    await prisma.customer.deleteMany();
    await prisma.product.deleteMany();
    await prisma.contactSubmission.deleteMany();
    const product1 = await prisma.product.create({
        data: {
            name: 'Legendary Chicken Ramen',
            category: 'Ramen',
            price: 12.99,
            originalPrice: 14.99,
            discount: '15%',
            image: 'https://r9bjibnci2.ufs.sh/f/Bg4UzKvxRd3ob9yZTr1GrN0i9hgzAHWQjZ4Cd3PpeBlVSfUD',
            description: 'Rich, flavorful chicken broth paired with premium ramen noodles, juicy grilled chicken, and perfectly cooked egg. Every bowl promises an authentic, legendary ramen experience.',
            features: [
                "Slow-cooked chicken broth for deep flavor",
                "Premium ramen noodles with perfect texture",
                "Topped with tender grilled chicken & fresh toppings",
            ],
            sku: 'RAM-001',
            rating: 4.8,
            reviewCount: 120,
            inStock: true,
            slug: 'legendary-chicken-ramen',
            categories: ['Ramen', 'Popular', 'Chicken'],
            galleryImages: [
                'https://r9bjibnci2.ufs.sh/f/Bg4UzKvxRd3ovkkAvr076Tz4X2KVUD1Ql3YGZyInOSmJuqwa',
                'https://r9bjibnci2.ufs.sh/f/Bg4UzKvxRd3oVRp6sdCW6jO9JZ4HhPRoqTnv0xuzGpsadfg7',
                'https://r9bjibnci2.ufs.sh/f/Bg4UzKvxRd3onsHvgzq3uYq2ekOzv6T0SPdQ3wtbM9yVEgWU',
            ],
            tags: ['ramen', 'chicken', 'popular'],
        },
    });
    const product2 = await prisma.product.create({
        data: {
            name: 'Karaage Dry Ramen',
            category: 'Dry Ramen',
            price: 10.99,
            image: 'https://r9bjibnci2.ufs.sh/f/Bg4UzKvxRd3oeEN2LEGBrLY6W34ExyI2pbUQDJlHu1vzMnK8',
            description: 'Irresistibly crispy Japanese fried chicken atop dry ramen, tossed with a savory, aromatic sauce and fresh garnishes for a bold, modern flavor twist.',
            features: [
                "Crispy fried chicken for a satisfying crunch",
                "Dry ramen noodles for a satisfying texture",
                "Savory, aromatic sauce for a satisfying flavor",
                "Fresh garnishes for a satisfying finish",
            ],
            sku: 'KAR-001',
            rating: 4.5,
            reviewCount: 85,
            inStock: true,
            slug: 'karaage-dry-ramen',
            categories: ['Dry Ramen', 'Chicken'],
            galleryImages: [
                'https://r9bjibnci2.ufs.sh/f/Bg4UzKvxRd3o5miofEYTgau2RKeZo6P0v7SOmtcLC415Yb8H',
                'https://r9bjibnci2.ufs.sh/f/Bg4UzKvxRd3oTJJGZYpDfzYUogclnKdJEASm5jVrt8XeCxsI',
                'https://r9bjibnci2.ufs.sh/f/Bg4UzKvxRd3oFozCmFxxGkAn1ZSv8Pmgb0lR3yKMBdzUea2t',
            ],
            tags: ['karaage', 'dry ramen', 'chicken'],
        },
    });
    await prisma.productRelation.create({
        data: {
            productId: product1.id,
            relatedProductId: product2.id,
            tag: 'popular',
        },
    });
    const customer1 = await prisma.customer.create({
        data: {
            customerId: 'CUST-001',
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: 'hashed_password_here',
            username: 'johndoe',
            phone: '+1234567890',
            address: '123 Main St',
            city: 'New York',
            birthday: new Date('1990-01-15'),
            image: 'https://example.com/images/john-doe.jpg',
            location: 'New York, USA',
            totalSpent: 250.75,
        },
    });
    const order1 = await prisma.order.create({
        data: {
            orderId: 'ORD-001',
            customerName: 'John Doe',
            typeOrder: 'DINE_IN',
            amount: 23.98,
            status: 'DELIVERED',
            note: 'No onions please',
            customerId: customer1.id,
            items: {
                create: [
                    {
                        name: 'Legendary Chicken Ramen',
                        image: 'https://r9bjibnci2.ufs.sh/f/Bg4UzKvxRd3ob9yZTr1GrN0i9hgzAHWQjZ4Cd3PpeBlVSfUD',
                        quantity: 1,
                        price: 12.99,
                        category: 'Ramen',
                        productId: product1.id,
                    },
                    {
                        name: 'Karaage Dry Ramen',
                        image: 'https://r9bjibnci2.ufs.sh/f/Bg4UzKvxRd3oeEN2LEGBrLY6W34ExyI2pbUQDJlHu1vzMnK8',
                        quantity: 1,
                        price: 10.99,
                        category: 'Dry Ramen',
                        productId: product2.id,
                    },
                ],
            },
            billing: {
                create: {
                    name: 'John Doe',
                    address: '123 Main St, New York',
                    postalCode: '10001',
                },
            },
            shipping: {
                create: {
                    name: 'John Doe',
                    address: '123 Main St, New York',
                    postalCode: '10001',
                },
            },
        },
    });
    await prisma.lastOrder.create({
        data: {
            amount: 23.98,
            date: new Date(),
            customerId: customer1.id,
        },
    });
    await prisma.contactSubmission.create({
        data: {
            name: 'Jane Smith',
            phone: '+1987654321',
            email: 'jane.smith@example.com',
            topic: 'Reservation',
            location: 'New York',
            message: 'I would like to make a reservation for 4 people on Friday at 7 PM.',
        },
    });
    console.log('Seed data created successfully');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map