import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";
import { ProductsModule } from "./products/products.module";
import { ProductRelationsModule } from "./product-relations/product-relations.module";
import { CustomersModule } from "./customers/customers.module";
import { OrdersModule } from "./orders/orders.module";
import { OrderItemsModule } from "./order-items/order-items.module";
import { BillingsModule } from "./billings/billings.module";
import { ShippingsModule } from "./shippings/shippings.module";
import { LastOrdersModule } from "./last-orders/last-orders.module";
import { ContactSubmissionsModule } from "./contact-submissions/contact-submissions.module";
import { AccessControlMiddleware } from "./common/middleware/access-control.middleware";
import { CommonModule } from "./common/common.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    CommonModule,
    AuthModule,
    ProductsModule,
    ProductRelationsModule,
    CustomersModule,
    OrdersModule,
    OrderItemsModule,
    BillingsModule,
    ShippingsModule,
    LastOrdersModule,
    ContactSubmissionsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AccessControlMiddleware)
      .forRoutes(
        'customers',
        'orders', 
        'order-items',
        'billings',
        'shippings',
        'last-orders',
        'contact-submissions',
        'products',
        'product-relations'
      );
  }
}
