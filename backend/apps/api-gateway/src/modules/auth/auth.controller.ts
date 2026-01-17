import { Controller, Post, Body, Inject } from "@nestjs/common";
import { AuthTokenOutput, LoginUserDto, RegisterUserDto } from "./dtos/UserDto";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { AUTH_SERVICE, EVENTS } from "@margazm/common";

@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
  constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy) {}

  @Post("register")
  @ApiOperation({ summary: "Register new user" })
  @ApiResponse({ status: 201, description: "User successfully registered." })
  async register(@Body() registerUserDto: RegisterUserDto): Promise<AuthTokenOutput> {
    return await firstValueFrom(this.authClient.send(EVENTS.AUTH.REGISTER, registerUserDto));
  }

  @Post("login")
  @ApiOperation({ summary: "Login user and get access token" })
  @ApiResponse({ status: 200, description: "Successful login" })
  async login(@Body() loginUserDto: LoginUserDto): Promise<AuthTokenOutput> {
    try {
      console.log(loginUserDto, "dto");
      return await firstValueFrom(this.authClient.send(EVENTS.AUTH.LOGIN, loginUserDto));
    } catch (error) {
      console.log(error, "error controller login");
      throw error;
    }
  }
}
