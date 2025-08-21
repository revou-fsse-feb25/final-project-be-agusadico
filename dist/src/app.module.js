"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const prisma_module_1 = require("./prisma/prisma.module");
const auth_module_1 = require("./auth/auth.module");
const products_module_1 = require("./products/products.module");
const product_relations_module_1 = require("./product-relations/product-relations.module");
const customers_module_1 = require("./customers/customers.module");
const orders_module_1 = require("./orders/orders.module");
const order_items_module_1 = require("./order-items/order-items.module");
const billings_module_1 = require("./billings/billings.module");
const shippings_module_1 = require("./shippings/shippings.module");
const last_orders_module_1 = require("./last-orders/last-orders.module");
const contact_submissions_module_1 = require("./contact-submissions/contact-submissions.module");
const access_control_middleware_1 = require("./common/middleware/access-control.middleware");
const common_module_1 = require("./common/common.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(access_control_middleware_1.AccessControlMiddleware)
            .forRoutes('customers', 'orders', 'order-items', 'billings', 'shippings', 'last-orders', 'contact-submissions', 'products', 'product-relations');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            prisma_module_1.PrismaModule,
            common_module_1.CommonModule,
            auth_module_1.AuthModule,
            products_module_1.ProductsModule,
            product_relations_module_1.ProductRelationsModule,
            customers_module_1.CustomersModule,
            orders_module_1.OrdersModule,
            order_items_module_1.OrderItemsModule,
            billings_module_1.BillingsModule,
            shippings_module_1.ShippingsModule,
            last_orders_module_1.LastOrdersModule,
            contact_submissions_module_1.ContactSubmissionsModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map