import { Notification } from "../../domain/models/Notification";
import { CreateNotificationDto } from "../../infrastructure/dtos/CreateNotificationDto";
import { UpdateNotificationDto } from "../../infrastructure/dtos/UpdateNotificationDto";

export interface INotificationRepository {
  createNotification: (data: CreateNotificationDto) => Promise<Notification>;
  updateNotification: (data: UpdateNotificationDto) => Promise<Notification>;
  getAllNotifications: () => Promise<Notification[]>;
  getNotificationById: (notificationId: string) => Promise<Notification | null>;
  deleteNotification: (notificationId: string) => Promise<void>;
}
