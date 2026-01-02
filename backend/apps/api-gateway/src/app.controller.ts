import { Controller, Get } from "@nestjs/common";
import { ApiGatewayService } from "./app.service";
import { ApiTags, ApiOperation } from "@nestjs/swagger";

@ApiTags("System")
@Controller()
export class ApiGatewayController {
  constructor(private readonly apiGatewayService: ApiGatewayService) {}

  @Get("health")
  @ApiOperation({ summary: "Check Gateway Status." })
  getHealth() {
    return this.apiGatewayService.getHealthStatus();
  }
}
