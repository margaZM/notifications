import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class RegisterContactDto {
  @ApiProperty({
    example: "test@example.com",
    description: "Contact email.",
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({
    example: "999999999",
    description: "Contact phone number.",
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(9, { message: "The phone number must have at least 9 characters." })
  phoneNumber!: string;

  @ApiProperty({
    example: "03df25c845d460bcdad7802d2vf6fc1dfde97283bf75cc993eb6dca835ea2e2f",
    description: "Contact device token.",
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  deviceToken!: string;
}

export class ContactOutput {
  @ApiProperty({
    example: "Contact uuid.",
    description: "Unique contact ID.",
  })
  contactId!: string;

  @ApiProperty({
    example: "test@example.com",
  })
  email!: string;

  @ApiProperty({
    example: "999999999",
  })
  phoneNumber!: string;

  @ApiProperty({
    example: "03df25c845d460bcdad7802d2vf6fc1dfde97283bf75cc993eb6dca835ea2e2f",
  })
  deviceToken!: string;

  @ApiProperty({
    example: "2025-12-04T19:41:28.469Z",
    description: "Contact creation date",
  })
  createdAt!: Date;
}
