import { Controller } from "@nestjs/common";
import { NotificationsService } from "../services/notification.service";
import { MessagePattern, Payload } from "@nestjs/microservices";
import {
  CreateNotificationDto,
  DeleteNotificationDto,
  FindOneNotificationDto,
  NotificationResponseDto,
  UpdateNotificationDto,
} from "../dtos/NotificationDto";
import { EVENTS } from "@margazm/common";

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @MessagePattern(EVENTS.NOTIFICATIONS.CREATE)
  async create(
    @Payload() createNotificationDto: CreateNotificationDto,
  ): Promise<NotificationResponseDto> {
    console.log(createNotificationDto, "createNotificationDto");
    return this.notificationsService.create(createNotificationDto);
  }

  @MessagePattern(EVENTS.NOTIFICATIONS.FIND_ALL)
  async getAll(@Payload() authorId: string): Promise<NotificationResponseDto[]> {
    return this.notificationsService.getAll(authorId);
  }

  @MessagePattern(EVENTS.NOTIFICATIONS.FIND_ONE)
  async getById(
    @Payload() findNotificationDto: FindOneNotificationDto,
  ): Promise<NotificationResponseDto> {
    return this.notificationsService.getById(findNotificationDto);
  }

  @MessagePattern(EVENTS.NOTIFICATIONS.DELETE)
  async delete(
    @Payload() deleteNotificationDto: DeleteNotificationDto,
  ): Promise<NotificationResponseDto> {
    return this.notificationsService.delete(deleteNotificationDto);
  }

  @MessagePattern(EVENTS.NOTIFICATIONS.UPDATE)
  async update(
    @Payload() updateNotificationDto: UpdateNotificationDto,
  ): Promise<NotificationResponseDto> {
    return this.notificationsService.update(updateNotificationDto);
  }
}
