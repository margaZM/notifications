import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { SendGridService } from "../sendgrid.service";
import {
  NotificationSender,
  NotificationSenderInput,
  NotificationSenderResponse,
} from "../../ports/notification-sender.interface";
import { NotificationStatus } from "@margazm/database";

@Injectable()
export class SendGridEmailSenderStrategy implements NotificationSender {
  private readonly logger = new Logger(SendGridEmailSenderStrategy.name);
  private readonly templateId: string;

  constructor(
    private readonly sendGridService: SendGridService,
    private readonly configService: ConfigService,
  ) {}

  async send(notification: NotificationSenderInput): Promise<NotificationSenderResponse> {
    const templateID = this.configService.get<string>("SENDGRID_BASE_TEMPLATE_ID");
    if (!templateID) {
      this.logger.error("SENDGRID_BASE_TEMPLATE_ID not found in environment");
      return {
        status: NotificationStatus.FAILED,
        errorCode: 400,
        sendAt: new Date(),
        errorMessage: "Internal configuration error: Missing Template ID",
      };
    }

    if (!notification.email) {
      return {
        status: NotificationStatus.FAILED,
        sendAt: new Date(),
        errorCode: 400,
        errorMessage: "El correo del destinatario es obligatorio.",
      };
    }

    try {
      this.logger.log(`Sending email to: ${notification.email}`);

      await this.sendGridService.sendEmail(notification.email, this.templateId, {
        subject: notification.title,
        body: notification.content,
      });

      return {
        status: NotificationStatus.SENT,
        sendAt: new Date(),
      };
    } catch (error: any) {
      const errorMessage = error.response?.body?.errors?.[0]?.message || error.message;

      return {
        status: NotificationStatus.FAILED,
        sendAt: new Date(),
        errorCode: error.code || 500,
        errorMessage: errorMessage || "Unknown error occurred while sending email.",
      };
    }
  }
}
