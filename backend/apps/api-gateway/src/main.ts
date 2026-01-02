import "dotenv/config";
import { NestFactory } from "@nestjs/core";
import { ApiGatewayModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { Logger, ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
  const logger = new Logger("Gateway");

  const config = new DocumentBuilder()
    .setTitle("Notifications API")
    .setDescription("Sistema de gestion de notificaciones.")
    .setVersion("1.0")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        name: "JWT",
        description: "JWT token",
        in: "header",
      },
      "access-token",
    )
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, documentFactory);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      validationError: {
        target: false,
        value: false,
      },
    }),
  );

  const port = process.env.port || 3000;

  await app.listen(port);
  logger.log(`API Gateway corriendo en http://localhost:${port}`);
}
bootstrap();
