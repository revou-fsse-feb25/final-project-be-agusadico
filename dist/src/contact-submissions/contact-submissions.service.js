"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactSubmissionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ContactSubmissionsService = class ContactSubmissionsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createContactSubmissionDto) {
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
    async findOne(id) {
        const contactSubmission = await this.prisma.contactSubmission.findUnique({
            where: { id },
        });
        if (!contactSubmission) {
            throw new common_1.NotFoundException(`Contact submission with ID ${id} not found`);
        }
        return contactSubmission;
    }
    async findByEmail(email) {
        return this.prisma.contactSubmission.findMany({
            where: { email },
            orderBy: {
                submittedAt: "desc",
            },
        });
    }
    async findByTopic(topic) {
        return this.prisma.contactSubmission.findMany({
            where: { topic },
            orderBy: {
                submittedAt: "desc",
            },
        });
    }
    async update(id, updateContactSubmissionDto) {
        try {
            return await this.prisma.contactSubmission.update({
                where: { id },
                data: updateContactSubmissionDto,
            });
        }
        catch (_a) {
            throw new common_1.NotFoundException(`Contact submission with ID ${id} not found`);
        }
    }
    async remove(id) {
        try {
            await this.prisma.contactSubmission.delete({
                where: { id },
            });
            return { id, deleted: true };
        }
        catch (_a) {
            throw new common_1.NotFoundException(`Contact submission with ID ${id} not found`);
        }
    }
};
exports.ContactSubmissionsService = ContactSubmissionsService;
exports.ContactSubmissionsService = ContactSubmissionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ContactSubmissionsService);
//# sourceMappingURL=contact-submissions.service.js.map