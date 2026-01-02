import { Injectable, Logger } from "@nestjs/common";
import * as admin from "firebase-admin";

@Injectable()
export class PushService {
  private readonly logger = new Logger(PushService.name);

  constructor() {}

  async sendToDevice(token: string, title: string, body: string, data?: any): Promise<string> {
    const message: admin.messaging.Message = {
      notification: { title, body },
      token: token,
      data: data || {},
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

    return admin.messaging().send(message);
  }
}
