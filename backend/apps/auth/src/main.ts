import "dotenv/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger } from "@nestjs/common";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { SERVICES_CONFIG } from "@margazm/common";

async function bootstrap() {
  try {
    const logger = new Logger("AuthMain");
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.TCP,
      options: {
        port: SERVICES_CONFIG.AUTH.PORT,
        host: "0.0.0.0",
      },
    });

    await app.listen();
    logger.log("Microservicio AUTH ejecutándose en http://localhost:3001");
  } catch (error) {
    Logger.log("Error al iniciar el microservicio AUTH:", error);
  }
}
bootstrap();
