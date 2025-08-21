import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";

export class UpdateRoleDto {
  @ApiProperty({
    description: "User role",
    enum: ["USER", "ADMIN"],
    example: "ADMIN",
  })
  @IsEnum(["USER", "ADMIN"])
  role: "USER" | "ADMIN";
}

