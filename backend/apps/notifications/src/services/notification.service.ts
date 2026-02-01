import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import {
  CreateNotificationDto,
  DeleteNotificationDto,
  FindOneNotificationDto,
  FullNotificationResponseDto,
  UpdateNotificationDto,
} from "../dtos/NotificationDto";
import { HASHER_PORT, NOTIFICATIONS_REPOSITORY_PORT } from "../app.constants";
import { type INotificationRepository } from "../repositories/notification-repository.interface";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { NotificationStatus } from "@margazm/database";
import { CONTACTS_SERVICE, EVENTS } from "@margazm/common";
import { NotificationSenderService } from "./notification-sender.service";
import { RpcException } from "@nestjs/microservices";
import { HashGenerator } from "src/ports/hash-generator.interface";

@Injectable()
export class NotificationsService {
  constructor(
    private readonly senderService: NotificationSenderService,

    @Inject(NOTIFICATIONS_REPOSITORY_PORT)
    private readonly notificationRepository: INotificationRepository,

    @Inject(CONTACTS_SERVICE)
    private readonly contactClient: ClientProxy,

    @Inject(HASHER_PORT)
    private readonly cryptoHashService: HashGenerator,
  ) {}

  async create(
    data: CreateNotificationDto & { authorId: string },
  ): Promise<FullNotificationResponseDto> {
    let initialNotification = {} as FullNotificationResponseDto;
    let contact = {
      phoneNumber: "",
      email: "",
      deviceToken: "",
    };

    const notificationHashData = {
      title: data.title,
      content: data.content,
      channel: data.channel,
      authorId: data.authorId,
      recipientContactId: data.recipientContactId,
    };

    const notificationHash = this.cryptoHashService.generate(notificationHashData);
    const existsNotification =
      (await this.notificationRepository.getNotificationByHash({
        authorId: data.authorId,
        notificationHash,
      })) || null;

    console.log("Exists Notification:", existsNotification);

    if (existsNotification === null) {
      console.log("Creating new notification");
      contact = await this.fetchContactData(data.recipientContactId);
      initialNotification = await this.notificationRepository.createNotification({
        ...data,
        authorId: data.authorId,
        notificationHash: notificationHash,
      });
    } else {
      if (existsNotification.status === NotificationStatus.SENT) {
        throw new RpcException({ message: "Duplicate notification.", statusCode: 400 });
      }
      initialNotification = existsNotification;
    }

    try {
      const deliveryResult = await this.senderService.send(data.channel, {
        title: data.title,
        content: data.content,
        channel: data.channel,
        phoneNumber: `+51${contact.phoneNumber}`,
        email: contact.email,
        deviceToken: contact.deviceToken,
      });

      return await this.notificationRepository.updateNotification({
        notificationId: initialNotification.notificationId,
        authorId: data.authorId,
        recipientContactId: data.recipientContactId,
        channel: data.channel,
        status: deliveryResult.status,
        sentAt: deliveryResult.status === NotificationStatus.SENT ? deliveryResult.sendAt : null,
        title: data.title,
        content: data.content,
      });
    } catch (error) {
      return await this.notificationRepository.updateNotification({
        notificationId: initialNotification.notificationId,
        authorId: data.authorId,
        recipientContactId: data.recipientContactId,
        channel: data.channel,
        status: NotificationStatus.FAILED,
        title: data.title,
        content: data.content,
        sentAt: null,
      });
    }
  }

  async delete(data: DeleteNotificationDto): Promise<FullNotificationResponseDto> {
    const exists = await this.notificationRepository.getNotificationById(data);
    if (!exists) {
      throw new RpcException({ message: "Notification not found.", statusCode: 404 });
    }
    return await this.notificationRepository.deleteNotification(data);
  }

  async getById(data: FindOneNotificationDto): Promise<FullNotificationResponseDto> {
    const notification = await this.notificationRepository.getNotificationById(data);
    if (!notification) {
      throw new RpcException({ message: "Notification not found.", statusCode: 404 });
    }
    return notification;
  }

  async getAll(id: string): Promise<FullNotificationResponseDto[]> {
    return await this.notificationRepository.getAllNotifications(id);
  }

  async update(data: UpdateNotificationDto): Promise<FullNotificationResponseDto> {
    const exists = await this.notificationRepository.getNotificationById({
      notificationId: data.notificationId,
      authorId: data.authorId,
    });
    if (!exists) throw new RpcException({ message: "Notification not found.", statusCode: 404 });
    if (exists.status === NotificationStatus.SENT) {
      if (data.recipientContactId || data.channel) {
        throw new RpcException({
          message: "Notification has already been sent.",
          statusCode: 400,
        });
      }
    }
    const targetContactId = data.recipientContactId || exists.recipientContactId;

    const contact = await this.fetchContactData(targetContactId);

    const targetChannel = data.channel || exists.channel;

    try {
      const deliveryResult = await this.senderService.send(targetChannel, {
        title: data.title,
        content: data.content,
        channel: data.channel,
        phoneNumber: `+51${contact.phoneNumber}`,
        email: contact.email,
        deviceToken: contact.deviceToken,
      });
      const updatePayload: UpdateNotificationDto = {
        ...data,
        title: data.title || exists.title,
        content: data.content || exists.content,
        recipientContactId: targetContactId,
        channel: targetChannel,
        status: deliveryResult.status,
        sentAt: deliveryResult.status === NotificationStatus.SENT ? deliveryResult.sendAt : null,
      };

      return await this.notificationRepository.updateNotification(updatePayload);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      return await this.notificationRepository.updateNotification({
        ...data,
        recipientContactId: targetContactId,
        channel: targetChannel,
        status: NotificationStatus.FAILED,
        title: data.title || exists.title,
        content: data.content || exists.content,
        sentAt: null,
      });
    }
  }

  private async fetchContactData(contactId: string) {
    try {
      const contact = await firstValueFrom(
        this.contactClient.send(EVENTS.CONTACTS.FIND_BY_ID, contactId),
      );
      if (!contact)
        throw new RpcException({
          message: `Contact ${contactId} not found`,
          statusCode: 404,
        });
      return contact;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new RpcException({
        message: "Internal server error.",
        statusCode: 500,
      });
    }
  }
}
