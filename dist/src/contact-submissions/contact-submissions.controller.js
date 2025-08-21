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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactSubmissionsController = void 0;
const common_1 = require("@nestjs/common");
const contact_submissions_service_1 = require("./contact-submissions.service");
const create_contact_submission_dto_1 = require("./dto/create-contact-submission.dto");
const update_contact_submission_dto_1 = require("./dto/update-contact-submission.dto");
const swagger_1 = require("@nestjs/swagger");
const contact_submission_entity_1 = require("./entities/contact-submission.entity");
let ContactSubmissionsController = class ContactSubmissionsController {
    constructor(contactSubmissionsService) {
        this.contactSubmissionsService = contactSubmissionsService;
    }
    create(createContactSubmissionDto) {
        return this.contactSubmissionsService.create(createContactSubmissionDto);
    }
    findAll() {
        return this.contactSubmissionsService.findAll();
    }
    findOne(id) {
        return this.contactSubmissionsService.findOne(id);
    }
    findByEmail(email) {
        return this.contactSubmissionsService.findByEmail(email);
    }
    findByTopic(topic) {
        return this.contactSubmissionsService.findByTopic(topic);
    }
    update(id, updateContactSubmissionDto) {
        return this.contactSubmissionsService.update(id, updateContactSubmissionDto);
    }
    remove(id) {
        return this.contactSubmissionsService.remove(id);
    }
};
exports.ContactSubmissionsController = ContactSubmissionsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: "Create a new contact submission" }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "The contact submission has been successfully created.",
        type: contact_submission_entity_1.ContactSubmission,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_contact_submission_dto_1.CreateContactSubmissionDto]),
    __metadata("design:returntype", void 0)
], ContactSubmissionsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "Get all contact submissions" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Return all contact submissions.",
        type: [contact_submission_entity_1.ContactSubmission],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ContactSubmissionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Get a contact submission by id" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Contact submission ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Return the contact submission.",
        type: contact_submission_entity_1.ContactSubmission,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Contact submission not found." }),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ContactSubmissionsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)("email/:email"),
    (0, swagger_1.ApiOperation)({ summary: "Get contact submissions by email" }),
    (0, swagger_1.ApiParam)({ name: "email", description: "Email address" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Return contact submissions for the specified email.",
        type: [contact_submission_entity_1.ContactSubmission],
    }),
    __param(0, (0, common_1.Param)("email")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ContactSubmissionsController.prototype, "findByEmail", null);
__decorate([
    (0, common_1.Get)("topic/:topic"),
    (0, swagger_1.ApiOperation)({ summary: "Get contact submissions by topic" }),
    (0, swagger_1.ApiParam)({ name: "topic", description: "Topic/subject" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Return contact submissions for the specified topic.",
        type: [contact_submission_entity_1.ContactSubmission],
    }),
    __param(0, (0, common_1.Param)("topic")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ContactSubmissionsController.prototype, "findByTopic", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Update a contact submission" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Contact submission ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "The contact submission has been successfully updated.",
        type: contact_submission_entity_1.ContactSubmission,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Contact submission not found." }),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_contact_submission_dto_1.UpdateContactSubmissionDto]),
    __metadata("design:returntype", void 0)
], ContactSubmissionsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Delete a contact submission" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Contact submission ID" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "The contact submission has been successfully deleted.",
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Contact submission not found." }),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ContactSubmissionsController.prototype, "remove", null);
exports.ContactSubmissionsController = ContactSubmissionsController = __decorate([
    (0, swagger_1.ApiTags)("contact-submissions"),
    (0, common_1.Controller)("contact-submissions"),
    __metadata("design:paramtypes", [contact_submissions_service_1.ContactSubmissionsService])
], ContactSubmissionsController);
//# sourceMappingURL=contact-submissions.controller.js.map