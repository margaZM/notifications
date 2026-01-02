import {
  Injectable,
  Logger,
  InternalServerErrorException,
  BadRequestException,
} from "@nestjs/common";
import * as admin from "firebase-admin";

@Injectable()
export class PushService {
  private readonly logger = new Logger(PushService.name);

  constructor() {}

  async sendToDevice(token: string, title: string, body: string): Promise<string> {
    try {
      if (!token || !title) {
        throw new BadRequestException("Device token and title are required.");
      }

      this.logger.log(`Sending notification to: ${token}`);

      const message: admin.messaging.Message = {
        notification: { title, body },
        token: token,
        android: {
          priority: "high",
          notification: { sound: "default" },
        },
        apns: {
          payload: {
            aps: { sound: "default" },
          },
        },
      };
      await new Promise((res) => setTimeout(res, 400));
      this.logger.log(`Notificación enviada exitosamente. Data: ${message}`);

      return "Push sent successfully with Firebase Messaging";
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Uknown error in Firebase Messaging";

      this.logger.error(`Push failed error: ${errorMessage}`);

      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException(`Error push service: ${errorMessage}`);
    }
  }
}
