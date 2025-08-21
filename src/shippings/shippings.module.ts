import { Module } from "@nestjs/common";
import { ShippingsService } from "./shippings.service";
import { ShippingsController } from "./shippings.controller";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [ShippingsController],
  providers: [ShippingsService],
  exports: [ShippingsService],
})
export class ShippingsModule {}
