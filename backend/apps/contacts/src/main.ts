import "dotenv/config";
import { NestFactory } from "@nestjs/core";
import { ContactsModule } from "./app.module";
import { SERVICES_CONFIG } from "@margazm/common";
import { Logger } from "@nestjs/common";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

async function bootstrap() {
  const logger = new Logger("ContactMain");
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(ContactsModule, {
    transport: Transport.TCP,
    options: {
      port: SERVICES_CONFIG.CONTACTS.PORT,
      host: "0.0.0.0",
    },
  });

  await app.listen();
  logger.log("Microservicio CONTACTS ejecutándose en http://localhost:3002");
}
bootstrap();
