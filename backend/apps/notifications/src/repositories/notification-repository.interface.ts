import {
  CreateNotificationDto,
  NotificationResponseDto,
  UpdateNotificationDto,
  DeleteNotificationDto,
  FindOneNotificationDto,
} from "../dtos/NotificationDto";

export interface INotificationRepository {
  createNotification: (data: CreateNotificationDto) => Promise<NotificationResponseDto>;
  updateNotification: (data: UpdateNotificationDto) => Promise<NotificationResponseDto>;
  getAllNotifications: (authorId: string) => Promise<NotificationResponseDto[]>;
  getNotificationById: (data: FindOneNotificationDto) => Promise<NotificationResponseDto | null>;
  deleteNotification: (data: DeleteNotificationDto) => Promise<NotificationResponseDto>;
}
