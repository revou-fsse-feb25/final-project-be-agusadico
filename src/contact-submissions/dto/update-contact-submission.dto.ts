import { PartialType } from "@nestjs/swagger";
import { CreateContactSubmissionDto } from "./create-contact-submission.dto";

export class UpdateContactSubmissionDto extends PartialType(
  CreateContactSubmissionDto,
) {}
