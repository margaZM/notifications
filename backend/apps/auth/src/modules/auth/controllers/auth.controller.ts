import { Controller, Get } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { LoginUserDto } from "../dtos/LoginUserDto";
import { AuthTokenOutput } from "../dtos/AuthTokenOutput";
import { EVENTS } from "@margazm/common";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern(EVENTS.AUTH.LOGIN)
  async login(@Payload() credentials: LoginUserDto): Promise<AuthTokenOutput> {
    return this.authService.login(credentials);
  }

  @MessagePattern(EVENTS.AUTH.REGISTER)
  async register(@Payload() credentials: LoginUserDto): Promise<AuthTokenOutput> {
    return this.authService.register(credentials);
  }
}
