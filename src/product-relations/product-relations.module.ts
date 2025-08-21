import { Module } from "@nestjs/common";
import { ProductRelationsService } from "./product-relations.service";
import { ProductRelationsController } from "./product-relations.controller";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [ProductRelationsController],
  providers: [ProductRelationsService],
  exports: [ProductRelationsService],
})
export class ProductRelationsModule {}
