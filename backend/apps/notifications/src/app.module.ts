import { Module } from "@nestjs/common";
import { NotificationsController } from "./controllers/notifications.controller";
import { NotificationsService } from "./services/notification.service";
import { DatabaseModule } from "./database/database.module";
import { NotificationRepository } from "./repositories/notification.repository";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { HASHER_PORT, NOTIFICATIONS_REPOSITORY_PORT } from "./app.constants";
import { SendGridService } from "./services/sendgrid.service";
import { TwilioService } from "./services/twilio.service";
import { PushService } from "./services/push.service";
import { SendGridEmailSenderStrategy } from "./services/strategies/sendgrid-email.strategy";
import { TwilioSmsSenderStrategy } from "./services/strategies/twilio-sms.strategy";
import { PushNotificationSenderStrategy } from "./services/strategies/push.strategy";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { CONTACTS_SERVICE, SERVICES_CONFIG } from "@margazm/common";
import { NotificationSenderService } from "./services/notification-sender.service";
import { DatabaseService } from "@margazm/database";
import { HasherService } from "./services/hasher.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    ClientsModule.registerAsync([
      {
        name: CONTACTS_SERVICE,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async () => ({
          transport: Transport.TCP,
          options: {
            port: SERVICES_CONFIG.CONTACTS.PORT,
            host: "contacts-service",
          },
        }),
      },
    ]),
  ],
  controllers: [NotificationsController],
  providers: [
    NotificationsService,
    NotificationSenderService,
    {
      provide: NOTIFICATIONS_REPOSITORY_PORT,
      useFactory: (prisma: DatabaseService) => new NotificationRepository(prisma),
      inject: [DatabaseService],
    },
    {
      provide: SendGridService,
      useFactory: (config: ConfigService) => new SendGridService(config),
      inject: [ConfigService],
    },
    {
      provide: TwilioService,
      useFactory: (config: ConfigService) => new TwilioService(config),
      inject: [ConfigService],
    },
    {
      provide: PushService,
      useFactory: () => new PushService(),
      inject: [],
    },
    {
      provide: SendGridEmailSenderStrategy,
      useFactory: (config: ConfigService, sendgrid: SendGridService) =>
        new SendGridEmailSenderStrategy(sendgrid, config),
      inject: [ConfigService, SendGridService],
    },
    {
      provide: TwilioSmsSenderStrategy,
      useFactory: (twilio: TwilioService) => new TwilioSmsSenderStrategy(twilio),
      inject: [TwilioService],
    },
    {
      provide: PushNotificationSenderStrategy,
      useFactory: (push: PushService) => new PushNotificationSenderStrategy(push),
      inject: [PushService],
    },
    {
      provide: HASHER_PORT,
      useFactory: () => new HasherService(),
    },
  ],
  exports: [NOTIFICATIONS_REPOSITORY_PORT],
})
export class NotificationsModule {}
