import { Module } from "@nestjs/common";
import { BillingsService } from "./billings.service";
import { BillingsController } from "./billings.controller";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [BillingsController],
  providers: [BillingsService],
  exports: [BillingsService],
})
export class BillingsModule {}
