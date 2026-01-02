import { Injectable, Logger } from "@nestjs/common";
import {
  NotificationSender,
  NotificationSenderInput,
  NotificationSenderResponse,
} from "../../ports/notification-sender.interface";
import { PushService } from "../push.service";

@Injectable()
export class PushNotificationSenderStrategy implements NotificationSender {
  private readonly logger = new Logger(PushNotificationSenderStrategy.name);

  constructor(private readonly pushService: PushService) {}

  async send(notification: NotificationSenderInput): Promise<NotificationSenderResponse> {
    const deviceToken = notification.deviceToken;

    if (!deviceToken) {
      this.logger.warn("Falta el Token del dispositivo para la notificación Push.");
      return {
        status: "failed",
        sendAt: new Date(),
        errorCode: 400,
        errorMessage: "El token de dispositivo es obligatorio para el canal PUSH.",
      };
    }

    try {
      this.logger.log(`Enviando Push Notification a dispositivo: ${deviceToken}`);

      const messageId = await this.pushService.sendToDevice(
        deviceToken,
        notification.title,
        notification.content,
      );

      return {
        status: "sent",
        sendAt: new Date(),
      };
    } catch (error: any) {
      this.logger.error(`Error en PushNotificationSenderStrategy: ${error.message}`);

      const isTokenInvalid =
        error.code === "messaging/invalid-registration-token" ||
        error.code === "messaging/registration-token-not-registered";

      return {
        status: "failed",
        sendAt: new Date(),
        errorCode: error.code || "PUSH_ERROR",
        errorMessage: isTokenInvalid ? "El token del dispositivo ya no es válido." : error.message,
      };
    }
  }
}
