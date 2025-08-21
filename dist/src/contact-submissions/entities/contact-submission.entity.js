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
exports.ContactSubmission = void 0;
const swagger_1 = require("@nestjs/swagger");
class ContactSubmission {
}
exports.ContactSubmission = ContactSubmission;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Unique identifier" }),
    __metadata("design:type", Number)
], ContactSubmission.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Contact name" }),
    __metadata("design:type", String)
], ContactSubmission.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Contact phone number" }),
    __metadata("design:type", String)
], ContactSubmission.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Contact email address" }),
    __metadata("design:type", String)
], ContactSubmission.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Contact topic/subject" }),
    __metadata("design:type", String)
], ContactSubmission.prototype, "topic", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Contact location" }),
    __metadata("design:type", String)
], ContactSubmission.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Contact message" }),
    __metadata("design:type", String)
], ContactSubmission.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Submission timestamp" }),
    __metadata("design:type", Date)
], ContactSubmission.prototype, "submittedAt", void 0);
//# sourceMappingURL=contact-submission.entity.js.map