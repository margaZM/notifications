import "dotenv/config";
import { NestFactory } from "@nestjs/core";
import { NotificationsModule } from "./app.module";
import { Logger } from "@nestjs/common";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { SERVICES_CONFIG } from "@margazm/common";

async function bootstrap() {
  const logger = new Logger("ContactMain");
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(NotificationsModule, {
    transport: Transport.TCP,
    options: {
      port: SERVICES_CONFIG.NOTIFICATIONS.PORT,
      host: "0.0.0.0",
    },
  });

  await app.listen();
  logger.log("Microservicio NOTIFICATIONS ejecutándose en http://localhost:3003");
}
bootstrap();
