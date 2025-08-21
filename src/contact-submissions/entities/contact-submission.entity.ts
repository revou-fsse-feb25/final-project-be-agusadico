import { ApiProperty } from "@nestjs/swagger";

export class ContactSubmission {
  @ApiProperty({ description: "Unique identifier" })
  id: number;

  @ApiProperty({ description: "Contact name" })
  name: string;

  @ApiProperty({ description: "Contact phone number" })
  phone: string;

  @ApiProperty({ description: "Contact email address" })
  email: string;

  @ApiProperty({ description: "Contact topic/subject" })
  topic: string;

  @ApiProperty({ description: "Contact location" })
  location: string;

  @ApiProperty({ description: "Contact message" })
  message: string;

  @ApiProperty({ description: "Submission timestamp" })
  submittedAt: Date;
}
