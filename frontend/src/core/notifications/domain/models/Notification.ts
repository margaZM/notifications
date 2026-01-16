export enum NotificationStatus {
  PENDING = "PENDING",
  SENT = "SENT",
  FAILED = "FAILED",
}

export enum NotificationChannel {
  EMAIL = "EMAIL",
  SMS = "SMS",
  PUSH = "PUSH",
}

export class Notification {
  notificationId!: string;
  authorId!: string;
  title!: string;
  content!: string;
  status!: NotificationStatus;
  createdAt!: Date;
  sentAt!: Date;
  updatedAt!: Date;
  channel!: NotificationChannel;
  recipientContactId!: string;
}
