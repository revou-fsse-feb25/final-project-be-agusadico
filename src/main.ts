import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Setup Swagger
  const config = new DocumentBuilder()
    .setTitle("Restaurant Management API")
    .setDescription(
      "API for restaurant management system with JWT Authentication and Role-Based Access Control",
    )
    .setVersion("1.0")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        name: "JWT",
        description: "Enter JWT token",
        in: "header",
      },
      "JWT-auth", // This name here is important for references
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  // Enable CORS with permissive settings for easy frontend integration
  app.enableCors({
    origin: true, // Allow any origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // Allow cookies
  });

  const port = process.env.PORT || 4005;

  try {
    await app.listen(port);
    console.log(`🚀 Application is running on: http://localhost:${port}`);
    console.log(
      `📚 Swagger documentation available at: http://localhost:${port}/api`,
    );
  } catch (error: any) {
    if (error.code === "EADDRINUSE") {
      console.error(
        `❌ Port ${port} is already in use. Please try one of these solutions:`,
      );
      console.error(
        `   1. Kill the process using port ${port}: lsof -ti:${port} | xargs kill -9`,
      );
      console.error(`   2. Use a different port: PORT=5003 npm run start:dev`);
      console.error(`   3. Wait a few seconds and try again`);
    } else {
      console.error("❌ Failed to start application:", error.message);
    }
    process.exit(1);
  }
}

bootstrap().catch((error: any) => {
  console.error("Failed to start application:", error);
  process.exit(1);
});
