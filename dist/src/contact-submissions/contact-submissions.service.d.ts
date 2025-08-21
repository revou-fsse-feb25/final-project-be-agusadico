import { PrismaService } from "../prisma/prisma.service";
import { CreateContactSubmissionDto } from "./dto/create-contact-submission.dto";
import { UpdateContactSubmissionDto } from "./dto/update-contact-submission.dto";
export declare class ContactSubmissionsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createContactSubmissionDto: CreateContactSubmissionDto): Promise<{
        name: string;
        email: string;
        phone: string;
        location: string;
        id: number;
        message: string;
        topic: string;
        submittedAt: Date;
    }>;
    findAll(): Promise<{
        name: string;
        email: string;
        phone: string;
        location: string;
        id: number;
        message: string;
        topic: string;
        submittedAt: Date;
    }[]>;
    findOne(id: number): Promise<{
        name: string;
        email: string;
        phone: string;
        location: string;
        id: number;
        message: string;
        topic: string;
        submittedAt: Date;
    }>;
    findByEmail(email: string): Promise<{
        name: string;
        email: string;
        phone: string;
        location: string;
        id: number;
        message: string;
        topic: string;
        submittedAt: Date;
    }[]>;
    findByTopic(topic: string): Promise<{
        name: string;
        email: string;
        phone: string;
        location: string;
        id: number;
        message: string;
        topic: string;
        submittedAt: Date;
    }[]>;
    update(id: number, updateContactSubmissionDto: UpdateContactSubmissionDto): Promise<{
        name: string;
        email: string;
        phone: string;
        location: string;
        id: number;
        message: string;
        topic: string;
        submittedAt: Date;
    }>;
    remove(id: number): Promise<{
        id: number;
        deleted: boolean;
    }>;
}
