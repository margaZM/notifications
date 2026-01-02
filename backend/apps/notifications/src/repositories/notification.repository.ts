import { INotificationRepository } from "./notification-repository.interface";
import {
  CreateNotificationDto,
  DeleteNotificationDto,
  FindOneNotificationDto,
  NotificationResponseDto,
  UpdateNotificationDto,
} from "../dtos/NotificationDto";
import { Injectable } from "@nestjs/common";
import { DatabaseService } from "@margazm/database";

@Injectable()
export class NotificationRepository implements INotificationRepository {
  constructor(private prisma: DatabaseService) {}

  createNotification(data: CreateNotificationDto): Promise<NotificationResponseDto> {
    const { title, content, channel, authorId, recipientContactId } = data;
    return this.prisma.notification.create({
      data: {
        title,
        content,
        channel,
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

  deleteNotification(data: DeleteNotificationDto): Promise<NotificationResponseDto> {
    return this.prisma.notification.delete({
      where: { notificationId: data.notificationId, authorId: data.authorId },
    });
  }
}
