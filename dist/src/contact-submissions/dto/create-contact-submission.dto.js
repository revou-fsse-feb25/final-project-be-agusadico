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
exports.CreateContactSubmissionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateContactSubmissionDto {
}
exports.CreateContactSubmissionDto = CreateContactSubmissionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Contact name" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateContactSubmissionDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Contact phone number" }),
    (0, class_validator_1.IsPhoneNumber)(),
    __metadata("design:type", String)
], CreateContactSubmissionDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Contact email address" }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateContactSubmissionDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Contact topic/subject" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateContactSubmissionDto.prototype, "topic", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Contact location" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateContactSubmissionDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Contact message" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateContactSubmissionDto.prototype, "message", void 0);
//# sourceMappingURL=create-contact-submission.dto.js.map