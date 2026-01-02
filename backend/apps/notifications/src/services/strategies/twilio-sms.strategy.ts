import { Injectable, Logger } from "@nestjs/common";
import { TwilioService } from "../twilio.service";
import {
  NotificationSender,
  NotificationSenderInput,
  NotificationSenderResponse,
} from "../../ports/notification-sender.interface";
import { NotificationStatus } from "@margazm/database";

@Injectable()
export class TwilioSmsSenderStrategy implements NotificationSender {
  private readonly logger = new Logger(TwilioSmsSenderStrategy.name);

  constructor(private readonly twilioService: TwilioService) {}

  async send(notification: NotificationSenderInput): Promise<NotificationSenderResponse> {
    if (!notification.phoneNumber) {
      return {
        status: NotificationStatus.FAILED,
        sendAt: new Date(),
        errorCode: 400,
        errorMessage: "Phone number is required.",
      };
    }

    try {
      this.logger.log(`Sending SMS to: ${notification.phoneNumber}`);

      const messageBody = notification.title
        ? `${notification.title.toUpperCase()}: ${notification.content}`
        : notification.content;

      const result = await this.twilioService.sendSms(notification.phoneNumber, messageBody);

      this.logger.log(`Success: SID: ${result.sid}`);

      return {
        status: NotificationStatus.SENT,
        sendAt: new Date(),
      };
    } catch (error: any) {
      this.logger.error(`Error: ${error.message}`);

      return {
        status: NotificationStatus.FAILED,
        sendAt: new Date(),
        errorCode: error.status || error.code || 500,
        errorMessage: error.message || "Unknown error occurred while sending SMS.",
      };
    }
  }
}
