import { Module } from "@nestjs/common";
import { NotificationsController } from "./controllers/notifications.controller";
import { NotificationsService } from "./services/notification.service";
import { DatabaseModule } from "./database/database.module";
import { NotificationRepository } from "./repositories/notification.repository";
import { ConfigModule } from "@nestjs/config";
import { NOTIFICATIONS_REPOSITORY_PORT } from "./app.constants";
import { SendGridService } from "./services/sendgrid.service";
import { TwilioService } from "./services/twilio.service";
import { PushService } from "./services/push.service";
import { SendGridEmailSenderStrategy } from "./services/strategies/sendgrid-email.strategy";
import { TwilioSmsSenderStrategy } from "./services/strategies/twilio-sms.strategy";
import { PushNotificationSenderStrategy } from "./services/strategies/push.strategy";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { CONTACTS_SERVICE, SERVICES_CONFIG } from "@margazm/common";
import { NotificationSenderService } from "./services/notification-sender.service";

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
        useFactory: async () => ({
          transport: Transport.TCP,
          options: {
            port: SERVICES_CONFIG.CONTACTS.PORT,
          },
        }),
      },
    ]),
  ],
  controllers: [NotificationsController],
  providers: [
    NotificationsService,
    {
      provide: NOTIFICATIONS_REPOSITORY_PORT,
      useClass: NotificationRepository,
    },
    SendGridService,
    TwilioService,
    PushService,
    SendGridEmailSenderStrategy,
    TwilioSmsSenderStrategy,
    PushNotificationSenderStrategy,
    NotificationSenderService,
  ],
  exports: [NOTIFICATIONS_REPOSITORY_PORT, DatabaseModule],
})
export class NotificationsModule {}
