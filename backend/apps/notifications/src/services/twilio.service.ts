import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Twilio } from "twilio";

export class TwilioService {
  private readonly logger = new Logger(TwilioService.name);
  private readonly client: Twilio;
  private readonly fromNumber: string;

  constructor(private readonly configService: ConfigService) {
    const accountSid = this.configService.get<string>("TWILIO_ACCOUNT_SID");
    const authToken = this.configService.get<string>("TWILIO_AUTH_TOKEN");
    const phoneNumber = this.configService.get<string>("TWILIO_PHONE_NUMBER");

    if (!accountSid || !authToken || !phoneNumber) {
      this.logger.error("Missing Twilio configuration");
      throw new Error("Missing Twilio configuratio");
    }

    this.client = new Twilio(accountSid, authToken);
    this.fromNumber = phoneNumber;
  }

  async sendSms(to: string, body: string) {
    try {
      return await this.client.messages.create({
        body,
        from: this.fromNumber,
        to,
      });
    } catch (error: any) {
      this.logger.error(`Twilio Error: ${error.message}`);
      throw error;
    }
  }
}
