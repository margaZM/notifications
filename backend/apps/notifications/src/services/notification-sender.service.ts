import { Injectable, Logger } from "@nestjs/common";
import { NotificationChannel, NotificationStatus } from "@margazm/database";
import { SendGridEmailSenderStrategy } from "./strategies/sendgrid-email.strategy";
import { TwilioSmsSenderStrategy } from "./strategies/twilio-sms.strategy";
import { PushNotificationSenderStrategy } from "./strategies/push.strategy";
import {
  NotificationSenderResponse,
  NotificationSenderInput,
} from "src/dtos/NotificationSenderDto";
import { NotificationSender } from "src/ports/notification-sender.interface";
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class NotificationSenderService {
  private readonly logger = new Logger(NotificationSenderService.name);
  private readonly strategies: Map<NotificationChannel, NotificationSender>;

  constructor(
    private readonly emailStrategy: SendGridEmailSenderStrategy,
    private readonly smsStrategy: TwilioSmsSenderStrategy,
    private readonly pushStrategy: PushNotificationSenderStrategy,
  ) {
    this.strategies = new Map<NotificationChannel, NotificationSender>([
      [NotificationChannel.EMAIL, this.emailStrategy],
      [NotificationChannel.SMS, this.smsStrategy],
      [NotificationChannel.PUSH, this.pushStrategy],
    ]);
  }

  async send(
    channel: NotificationChannel,
    input: NotificationSenderInput,
  ): Promise<NotificationSenderResponse> {
    const strategy = this.strategies.get(channel);

    if (!strategy) {
      throw new RpcException({
        message: `Channel not supported: ${channel}`,
        statusCode: 400,
      });
    }

    try {
      this.logger.log(
        `Start ${channel} notification sending process with input: ${JSON.stringify(input)}`,
      );
      const result = await strategy.send(input);
      return result;
    } catch (error) {
      this.logger.error(`Fail send to [${channel}]: ${error.message}`);

      return {
        status: NotificationStatus.FAILED,
        sendAt: new Date(),
        errorMessage: error.message || "Unknown error",
      };
    }
  }
}
