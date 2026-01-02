import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: "test@example.com",
    description: "Correo electrónico para registro o login",
    required: true,
  })
  email!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: "Password123!",
    description: "Contraseña del usuario",
    required: true,
  })
  password!: string;
}

export class RegisterUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: "test@example.com",
    description: "Correo electrónico para registro o login",
    required: true,
  })
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: "La contraseña debe tener al menos 6 caracteres" })
  @ApiProperty({
    example: "Password123!",
    description: "Contraseña del usuario",
    required: true,
    minLength: 6,
  })
  password!: string;
}

export class AuthTokenOutput {
  @ApiProperty({
    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    description: "Token JWT generado",
  })
  token!: string;

  @ApiProperty({
    example: "uuid-del-usuario-123",
    description: "ID único del usuario",
  })
  userId!: string;

  @ApiProperty({
    example: "test@example.com",
  })
  email!: string;
}
