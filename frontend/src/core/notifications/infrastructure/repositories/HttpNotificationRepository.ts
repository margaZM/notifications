import { ApiService } from "@/src/core/shared/infrastructure/api/ApiService";
import { INotificationRepository } from "../../application/repositories/INotificationRepository";
import { CreateNotificationDto } from "../../infrastructure/dtos/CreateNotificationDto";
import { UpdateNotificationDto } from "../../infrastructure/dtos/UpdateNotificationDto";
import { Notification } from "../../domain/models/Notification";

export class NotificationRepository implements INotificationRepository {
  constructor(private readonly apiService: ApiService) {}

  createNotification(data: CreateNotificationDto): Promise<Notification> {
    return this.apiService.post<Notification>("/notifications", data);
  }

  updateNotification(data: UpdateNotificationDto): Promise<Notification> {
    return this.apiService.patch<Notification>(`/notifications/${data.notificationId}`, data);
  }

  getAllNotifications(): Promise<Notification[]> {
    return this.apiService.get<Notification[]>("/notifications");
  }

  getNotificationById(notificationId: string): Promise<Notification | null> {
    return this.apiService.get<Notification | null>(`/notifications/${notificationId}`);
  }

  deleteNotification(notificationId: string): Promise<void> {
    return this.apiService.delete<void>(`/notifications/${notificationId}`);
  }
}
