import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient() as any;

async function main() {
  // Clean up existing data
  await prisma.orderItem.deleteMany();
  await prisma.billing.deleteMany();
  await prisma.shipping.deleteMany();
  await prisma.order.deleteMany();
  await prisma.lastOrder.deleteMany();
  await prisma.productRelation.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.product.deleteMany();
  await prisma.contactSubmission.deleteMany();

  // Create products
  const product1 = await prisma.product.create({
    data: {
      name: 'Legendary Chicken Ramen',
      category: 'Ramen',
      price: 12.99,
      originalPrice: 14.99,
      discount: '15%',
      image: 'https://example.com/images/Legendary-Chicken-Ramen.jpg',
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
        'https://example.com/images/legendary-chicken-ramen-1.jpg',
        'https://example.com/images/legendary-chicken-ramen-2.jpg',
      ],
      tags: ['ramen', 'chicken', 'popular'],
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: 'Karaage Dry Ramen',
      category: 'Dry Ramen',
      price: 10.99,
      image: 'https://example.com/images/karaage-dry-ramen.jpg',
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
        'https://example.com/images/karaage-dry-ramen-1.jpg',
        'https://example.com/images/karaage-dry-ramen-2.jpg',
      ],
      tags: ['karaage', 'dry ramen', 'chicken'],
    },
  });

  // Create product relations
  await prisma.productRelation.create({
    data: {
      productId: product1.id,
      relatedProductId: product2.id,
      tag: 'popular',
    },
  });

  // Create customers
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

  // Create orders
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
            name: 'Beef Burger',
            image: 'https://example.com/images/beef-burger.jpg',
            quantity: 1,
            price: 12.99,
            category: 'Burger',
            productId: product1.id,
          },
          {
            name: 'Chicken Pasta',
            image: 'https://example.com/images/chicken-pasta.jpg',
            quantity: 1,
            price: 10.99,
            category: 'Pasta',
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

  // Create last order for customer
  await prisma.lastOrder.create({
    data: {
      amount: 23.98,
      date: new Date(),
      customerId: customer1.id,
    },
  });

  // Create contact submission
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