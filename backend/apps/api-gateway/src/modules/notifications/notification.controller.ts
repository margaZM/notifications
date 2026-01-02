import {
  Controller,
  Post,
  Body,
  UseGuards,
  Inject,
  Delete,
  Param,
  Get,
  Patch,
  Req,
} from "@nestjs/common";
import {
  CreateNotificationDto,
  NotificationResponseDto,
  UpdateNotificationDto,
} from "./dtos/NotificationDto";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";
import { AuthGuard } from "../auth/auth.guard";
import { NOTIFICATIONS_SERVICE, EVENTS } from "@margazm/common";

@ApiTags("Notifications")
@ApiBearerAuth("access-token")
@Controller("notifications")
export class NotificationController {
  constructor(@Inject(NOTIFICATIONS_SERVICE) private readonly notificationClient: ClientProxy) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Create new notification" })
  @ApiResponse({ status: 201, description: "Notification successfully created." })
  async create(
    @Body() createNotificationDto: CreateNotificationDto,
    @Req() req: any,
  ): Promise<NotificationResponseDto> {
    const userId = req.user.sub;
    return await firstValueFrom(
      this.notificationClient.send(EVENTS.NOTIFICATIONS.CREATE, {
        authorId: userId,
        ...createNotificationDto,
      }),
    );
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Get all notifications for the authenticated user" })
  @ApiResponse({ status: 200, description: "Success" })
  async getAll(@Req() req: any): Promise<NotificationResponseDto[]> {
    const authorId = req.user.sub;
    return await firstValueFrom(
      this.notificationClient.send(EVENTS.NOTIFICATIONS.FIND_ALL, authorId),
    );
  }

  @Get(":id")
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Get a notification" })
  @ApiResponse({ status: 200, description: "Success" })
  async getById(@Param("id") id: string, @Req() req: any): Promise<NotificationResponseDto> {
    const userId = req.user.sub;
    return await firstValueFrom(
      this.notificationClient.send(EVENTS.NOTIFICATIONS.FIND_ONE, {
        notificationId: id,
        authorId: userId,
      }),
    );
  }

  @Delete(":id")
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Delete a notification" })
  @ApiResponse({ status: 200, description: "Notification successfully deleted." })
  async delete(@Param("id") id: string, @Req() req: any): Promise<NotificationResponseDto> {
    const userId = req.user.sub;
    return await firstValueFrom(
      this.notificationClient.send(EVENTS.NOTIFICATIONS.DELETE, {
        notificationId: id,
        authorId: userId,
      }),
    );
  }

  @Patch(":id")
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Update a notification" })
  @ApiResponse({ status: 200, description: "Notification successfully updated." })
  async update(
    @Param("id") id: string,
    @Body() updateNotificationDto: UpdateNotificationDto,
  ): Promise<NotificationResponseDto> {
    console.log("updateNotificationDto", updateNotificationDto);
    return await firstValueFrom(
      this.notificationClient.send(EVENTS.NOTIFICATIONS.UPDATE, {
        notificationId: id,
        ...updateNotificationDto,
      }),
    );
  }
}
