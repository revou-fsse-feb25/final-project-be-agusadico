import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateContactSubmissionDto } from "./dto/create-contact-submission.dto";
import { UpdateContactSubmissionDto } from "./dto/update-contact-submission.dto";

@Injectable()
export class ContactSubmissionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createContactSubmissionDto: CreateContactSubmissionDto) {
    return this.prisma.contactSubmission.create({
      data: createContactSubmissionDto,
    });
  }

  async findAll() {
    return this.prisma.contactSubmission.findMany({
      orderBy: {
        submittedAt: "desc",
      },
    });
  }

  async findOne(id: number) {
    const contactSubmission = await this.prisma.contactSubmission.findUnique({
      where: { id },
    });

    if (!contactSubmission) {
      throw new NotFoundException(`Contact submission with ID ${id} not found`);
    }

    return contactSubmission;
  }

  async findByEmail(email: string) {
    return this.prisma.contactSubmission.findMany({
      where: { email },
      orderBy: {
        submittedAt: "desc",
      },
    });
  }

  async findByTopic(topic: string) {
    return this.prisma.contactSubmission.findMany({
      where: { topic },
      orderBy: {
        submittedAt: "desc",
      },
    });
  }

  async update(
    id: number,
    updateContactSubmissionDto: UpdateContactSubmissionDto,
  ) {
    try {
      return await this.prisma.contactSubmission.update({
        where: { id },
        data: updateContactSubmissionDto,
      });
    } catch {
      throw new NotFoundException(`Contact submission with ID ${id} not found`);
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.contactSubmission.delete({
        where: { id },
      });

      return { id, deleted: true };
    } catch {
      throw new NotFoundException(`Contact submission with ID ${id} not found`);
    }
  }
}
