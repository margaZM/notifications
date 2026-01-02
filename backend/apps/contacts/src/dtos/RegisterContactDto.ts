import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class RegisterContactDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(9, { message: "The phone number must have at least 9 characters." })
  phoneNumber!: string;

  @IsString()
  @IsNotEmpty()
  deviceToken!: string;
}
