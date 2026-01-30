import { Injectable, Logger } from "@nestjs/common";
import {
  NotificationSender,
  NotificationSenderInput,
  NotificationSenderResponse,
} from "../../ports/notification-sender.interface";
import { PushService } from "../push.service";
import { NotificationStatus } from "@margazm/database";

@Injectable()
export class PushNotificationSenderStrategy implements NotificationSender {
  private readonly logger = new Logger(PushNotificationSenderStrategy.name);

  constructor(private readonly pushService: PushService) {}

  async send(notification: NotificationSenderInput): Promise<NotificationSenderResponse> {
    const deviceToken = notification.deviceToken;

    if (!deviceToken) {
      return {
        status: NotificationStatus.FAILED,
        sendAt: new Date(),
        errorCode: 400,
        errorMessage: "Device token is required for push notifications.",
      };
    }

    try {
      this.logger.log(`Sending push notification: ${deviceToken}`);

      await this.pushService.sendPush(deviceToken, notification.title, notification.content);

      return {
        status: NotificationStatus.SENT,
        sendAt: new Date(),
      };
    } catch (error: any) {
      this.logger.error(`PushNotificationSenderStrategy Error: ${error.message}`);

      return {
        status: NotificationStatus.FAILED,
        sendAt: new Date(),
        errorCode: error.code || "PUSH_ERROR",
        errorMessage: error.message,
      };
    }
  }
}
