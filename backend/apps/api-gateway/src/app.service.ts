import { Injectable } from "@nestjs/common";

@Injectable()
export class ApiGatewayService {
  getHealthStatus() {
    return {
      status: "up",
      timestamp: new Date().toISOString(),
      service: "API Gateway",
      version: "1.0.0",
    };
  }
}
