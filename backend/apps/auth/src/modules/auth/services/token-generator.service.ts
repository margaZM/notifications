import { JwtService } from "@nestjs/jwt";
import { ITokenGenerator } from "../ports/token-generator.port";
import { Injectable } from "@nestjs/common";
@Injectable()
export class TokenGeneratorService implements ITokenGenerator {
  constructor(private jwtService: JwtService) {}
  generate(userId: string): Promise<string> {
    const payload = { sub: userId };
    return this.jwtService.signAsync(payload);
  }
  verify(token: string): Promise<object> {
    return this.jwtService.verifyAsync(token);
  }
}
