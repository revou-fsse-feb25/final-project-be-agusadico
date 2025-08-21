import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from "@nestjs/common";
import { ContactSubmissionsService } from "./contact-submissions.service";
import { CreateContactSubmissionDto } from "./dto/create-contact-submission.dto";
import { UpdateContactSubmissionDto } from "./dto/update-contact-submission.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";
import { ContactSubmission } from "./entities/contact-submission.entity";

@ApiTags("contact-submissions")
@Controller("contact-submissions")
export class ContactSubmissionsController {
  constructor(
    private readonly contactSubmissionsService: ContactSubmissionsService,
  ) {}

  @Post()
  @ApiOperation({ summary: "Create a new contact submission" })
  @ApiResponse({
    status: 201,
    description: "The contact submission has been successfully created.",
    type: ContactSubmission,
  })
  create(@Body() createContactSubmissionDto: CreateContactSubmissionDto) {
    return this.contactSubmissionsService.create(createContactSubmissionDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all contact submissions" })
  @ApiResponse({
    status: 200,
    description: "Return all contact submissions.",
    type: [ContactSubmission],
  })
  findAll() {
    return this.contactSubmissionsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a contact submission by id" })
  @ApiParam({ name: "id", description: "Contact submission ID" })
  @ApiResponse({
    status: 200,
    description: "Return the contact submission.",
    type: ContactSubmission,
  })
  @ApiResponse({ status: 404, description: "Contact submission not found." })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.contactSubmissionsService.findOne(id);
  }

  @Get("email/:email")
  @ApiOperation({ summary: "Get contact submissions by email" })
  @ApiParam({ name: "email", description: "Email address" })
  @ApiResponse({
    status: 200,
    description: "Return contact submissions for the specified email.",
    type: [ContactSubmission],
  })
  findByEmail(@Param("email") email: string) {
    return this.contactSubmissionsService.findByEmail(email);
  }

  @Get("topic/:topic")
  @ApiOperation({ summary: "Get contact submissions by topic" })
  @ApiParam({ name: "topic", description: "Topic/subject" })
  @ApiResponse({
    status: 200,
    description: "Return contact submissions for the specified topic.",
    type: [ContactSubmission],
  })
  findByTopic(@Param("topic") topic: string) {
    return this.contactSubmissionsService.findByTopic(topic);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a contact submission" })
  @ApiParam({ name: "id", description: "Contact submission ID" })
  @ApiResponse({
    status: 200,
    description: "The contact submission has been successfully updated.",
    type: ContactSubmission,
  })
  @ApiResponse({ status: 404, description: "Contact submission not found." })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateContactSubmissionDto: UpdateContactSubmissionDto,
  ) {
    return this.contactSubmissionsService.update(
      id,
      updateContactSubmissionDto,
    );
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a contact submission" })
  @ApiParam({ name: "id", description: "Contact submission ID" })
  @ApiResponse({
    status: 200,
    description: "The contact submission has been successfully deleted.",
  })
  @ApiResponse({ status: 404, description: "Contact submission not found." })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.contactSubmissionsService.remove(id);
  }
}
