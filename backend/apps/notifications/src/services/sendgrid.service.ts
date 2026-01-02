import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import sgMail from "@sendgrid/mail";

@Injectable()
export class SendGridService {
  private readonly logger = new Logger(SendGridService.name);
  private readonly fromEmail: string;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>("SENDGRID_API_KEY");
    const email = this.configService.get<string>("SENDGRID_SYSTEM_EMAIL_ADDRESS");

    if (!apiKey || !email) {
      this.logger.error("Configuración de SendGrid incompleta en el entorno");
      throw new Error("SendGrid configuration missing");
    }

    this.fromEmail = email;
    sgMail.setApiKey(apiKey);
  }

  async sendDynamicEmail(to: string, templateId: string, data: Record<string, any>) {
    try {
      return await sgMail.send({
        to,
        from: this.fromEmail,
        templateId,
        dynamicTemplateData: data,
      });
    } catch (error: any) {
      this.logger.error(`Error en cliente SendGrid: ${error.message}`);
      throw error;
    }
  }

  getSystemEmail() {
    return this.fromEmail;
  }
}
