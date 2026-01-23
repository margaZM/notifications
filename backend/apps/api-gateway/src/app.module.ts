import { Module } from "@nestjs/common";
import { ApiGatewayController } from "./app.controller";
import { ApiGatewayService } from "./app.service";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { AuthController } from "./modules/auth/auth.controller";
import { ContactController } from "./modules/contacts/contacts.controller";
import {
  AUTH_SERVICE,
  CONTACTS_SERVICE,
  NOTIFICATIONS_SERVICE,
  SERVICES_CONFIG,
} from "@margazm/common";
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
    ClientsModule.register([
      {
        name: AUTH_SERVICE,
        transport: Transport.TCP,
        options: {
          host: "auth-service",
          port: SERVICES_CONFIG.AUTH.PORT,
        },
      },
    ]),
    ClientsModule.register([
      {
        name: CONTACTS_SERVICE,
        transport: Transport.TCP,
        options: {
          host: "contacts-service",
          port: SERVICES_CONFIG.CONTACTS.PORT,
        },
      },
    ]),
    ClientsModule.register([
      {
        name: NOTIFICATIONS_SERVICE,
        transport: Transport.TCP,
        options: {
          host: "notifications-service",
          port: SERVICES_CONFIG.NOTIFICATIONS.PORT,
        },
      },
    ]),
  ],
  controllers: [ApiGatewayController, AuthController, ContactController, NotificationController],
  providers: [ApiGatewayService],
  exports: [ClientsModule],
})
export class ApiGatewayModule {}
