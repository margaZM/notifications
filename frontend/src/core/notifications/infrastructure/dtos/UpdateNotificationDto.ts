import { NotificationChannel, NotificationStatus } from "../../domain/models/Notification";

export class UpdateNotificationDto {
  notificationId!: string;
  recipientContactId!: string;
  title!: string;
  content!: string;
  status!: NotificationStatus;
  channel!: NotificationChannel;
}
