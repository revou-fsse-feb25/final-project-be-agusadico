import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, IsNotEmpty, IsPhoneNumber } from "class-validator";

export class CreateContactSubmissionDto {
  @ApiProperty({ description: "Contact name" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: "Contact phone number" })
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({ description: "Contact email address" })
  @IsEmail()
  email: string;

  @ApiProperty({ description: "Contact topic/subject" })
  @IsString()
  @IsNotEmpty()
  topic: string;

  @ApiProperty({ description: "Contact location" })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({ description: "Contact message" })
  @IsString()
  @IsNotEmpty()
  message: string;
}
