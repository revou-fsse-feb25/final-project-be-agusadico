import { Module } from "@nestjs/common";
import { LastOrdersService } from "./last-orders.service";
import { LastOrdersController } from "./last-orders.controller";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [LastOrdersController],
  providers: [LastOrdersService],
  exports: [LastOrdersService],
})
export class LastOrdersModule {}
