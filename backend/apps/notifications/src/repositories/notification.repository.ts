import { INotificationRepository } from "./notification-repository.interface";
import {
  CreateNotificationDto,
  DeleteNotificationDto,
  FindOneNotificationDto,
  NotificationResponseDto,
  UpdateNotificationDto,
  FindByHashNotificationDto,
} from "../dtos/NotificationDto";
import { DatabaseService } from "@margazm/database";

export class NotificationRepository implements INotificationRepository {
  constructor(private prisma: DatabaseService) {}

  createNotification(
    data: CreateNotificationDto & { notificationHash: string },
  ): Promise<NotificationResponseDto> {
    const { title, content, channel, authorId, recipientContactId, notificationHash } = data;
    return this.prisma.notification.create({
      data: {
        title,
        content,
        channel,
        notificationHash,
        author: { connect: { userId: authorId } },
        recipientContact: { connect: { contactId: recipientContactId } },
      },
    });
  }

  getAllNotifications(id: string): Promise<NotificationResponseDto[]> {
    return this.prisma.notification.findMany({
      where: { authorId: id },
    });
  }

  updateNotification(data: UpdateNotificationDto): Promise<NotificationResponseDto> {
    const payload = {
      title: data?.title,
      content: data?.content,
      channel: data?.channel,
      status: data?.status,
    };

    const cleanData = Object.fromEntries(
      Object.entries(payload).filter(([_, value]) => value !== undefined),
    );

    return this.prisma.notification.update({
      where: { notificationId: data.notificationId, authorId: data.authorId },
      data: cleanData,
    });
  }

  getNotificationById(data: FindOneNotificationDto): Promise<NotificationResponseDto | null> {
    return this.prisma.notification.findUnique({
      where: { notificationId: data.notificationId, authorId: data.authorId },
    });
  }

  getNotificationByHash(data: FindByHashNotificationDto): Promise<NotificationResponseDto | null> {
    return this.prisma.notification.findUnique({
      where: { notificationHash: data.notificationHash, authorId: data.authorId },
    });
  }

  deleteNotification(data: DeleteNotificationDto): Promise<NotificationResponseDto> {
    return this.prisma.notification.delete({
      where: { notificationId: data.notificationId, authorId: data.authorId },
    });
  }
}
