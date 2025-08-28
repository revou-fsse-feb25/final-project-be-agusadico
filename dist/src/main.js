"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle("Restaurant Management API")
        .setDescription("API for restaurant management system with JWT Authentication and Role-Based Access Control")
        .setVersion("1.0")
        .addBearerAuth({
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        name: "JWT",
        description: "Enter JWT token",
        in: "header",
    }, "JWT-auth")
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup("api", app, document);
    app.enableCors({
        origin: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });
    const port = process.env.PORT || 4005;
    try {
        await app.listen(port);
        console.log(`🚀 Application is running on: http://localhost:${port}`);
        console.log(`📚 Swagger documentation available at: http://localhost:${port}/api`);
    }
    catch (error) {
        if (error.code === "EADDRINUSE") {
            console.error(`❌ Port ${port} is already in use. Please try one of these solutions:`);
            console.error(`   1. Kill the process using port ${port}: lsof -ti:${port} | xargs kill -9`);
            console.error(`   2. Use a different port: PORT=5003 npm run start:dev`);
            console.error(`   3. Wait a few seconds and try again`);
        }
        else {
            console.error("❌ Failed to start application:", error.message);
        }
        process.exit(1);
    }
}
bootstrap().catch((error) => {
    console.error("Failed to start application:", error);
    process.exit(1);
});
//# sourceMappingURL=main.js.map