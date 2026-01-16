import { NotificationChannel, NotificationStatus } from "../../domain/models/Notification";

export class CreateNotificationDto {
  title!: string;
  content!: string;
  recipientContactId!: string;
  channel!: NotificationChannel;
}
