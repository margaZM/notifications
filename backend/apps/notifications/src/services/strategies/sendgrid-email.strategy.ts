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
    private readonly configService: ConfigService,
    private readonly sendGridService: SendGridService,
  ) {
    const templateID = this.configService.get<string>("SENDGRID_BASE_TEMPLATE_ID");
    if (!templateID) {
      throw new Error("SENDGRID_BASE_TEMPLATE_ID not found in environment");
    }
    this.templateId = templateID;
  }

  async send(notification: NotificationSenderInput): Promise<NotificationSenderResponse> {
    if (!notification.email) {
      return {
        status: NotificationStatus.FAILED,
        sendAt: new Date(),
        errorCode: 400,
        errorMessage: "El correo del destinatario es obligatorio.",
      };
    }

    try {
      await this.sendGridService.sendDynamicEmail(notification.email, this.templateId, {
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
