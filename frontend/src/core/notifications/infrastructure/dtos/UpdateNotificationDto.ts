import { NotificationChannel, NotificationStatus } from "../../domain/models/Notification";

export class UpdateNotificationDto {
  recipientContactId!: string;
  title!: string;
  content!: string;
  status!: NotificationStatus;
  channel!: NotificationChannel;
}
