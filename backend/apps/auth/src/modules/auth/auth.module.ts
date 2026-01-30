import { Module } from "@nestjs/common";
import { AuthController } from "../auth/controllers/auth.controller";
import { AuthService } from "../auth/services/auth.service";
import { HasherService } from "./services/hasher.service";
import { TokenGeneratorService } from "./services/token-generator.service";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { UserModule } from "../user/user.module";
import { HASHER_PORT, TOKEN_GENERATOR_PORT } from "./auth.constants";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const secret = configService.get<string>("JWT_SECRET");
        const expiresIn = configService.get<string>("JWT_EXPIRES_IN") || "3600s";

        return {
          secret: secret,
          signOptions: {
            expiresIn: expiresIn as any,
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    ConfigService,
    AuthService,
    {
      provide: HASHER_PORT,
      useFactory: () => new HasherService(),
    },
    {
      provide: TOKEN_GENERATOR_PORT,
      useFactory: (jwtService: JwtService) => new TokenGeneratorService(jwtService),
      inject: [JwtService],
    },
  ],
  exports: [AuthService, HASHER_PORT, TOKEN_GENERATOR_PORT],
})
export class AuthModule {}
