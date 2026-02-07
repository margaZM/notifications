import { Module } from "@nestjs/common";
import { ApiGatewayController } from "./app.controller";
import { ApiGatewayService } from "./app.service";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { AuthController } from "./modules/auth/auth.controller";
import { ContactController } from "./modules/contacts/contacts.controller";
import { AUTH_SERVICE, CONTACTS_SERVICE, NOTIFICATIONS_SERVICE } from "@margazm/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { NotificationController } from "./modules/notifications/notification.controller";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>("JWT_SECRET"),
      }),
    }),
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: config.get<string>("AUTH_SERVICE_HOST") || "auth-service",
            port: config.get<number>("AUTH_SERVICE_PORT") || 3001,
          },
        }),
      },
      {
        name: CONTACTS_SERVICE,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: config.get<string>("CONTACTS_SERVICE_HOST") || "contacts-service",
            port: config.get<number>("CONTACTS_SERVICE_PORT") || 3002,
          },
        }),
      },
      {
        name: NOTIFICATIONS_SERVICE,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: config.get<string>("NOTIFICATIONS_SERVICE_HOST") || "notifications-service",
            port: config.get<number>("NOTIFICATIONS_SERVICE_PORT") || 3003,
          },
        }),
      },
    ]),
  ],
  controllers: [ApiGatewayController, AuthController, ContactController, NotificationController],
  providers: [ApiGatewayService],
  exports: [ClientsModule],
})
export class ApiGatewayModule {}
