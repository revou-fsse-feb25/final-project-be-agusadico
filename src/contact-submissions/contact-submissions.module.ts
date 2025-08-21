import { Module } from "@nestjs/common";
import { ContactSubmissionsService } from "./contact-submissions.service";
import { ContactSubmissionsController } from "./contact-submissions.controller";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [ContactSubmissionsController],
  providers: [ContactSubmissionsService],
  exports: [ContactSubmissionsService],
})
export class ContactSubmissionsModule {}
