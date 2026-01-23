import { IsNotEmpty, IsString, IsUUID, IsEnum, IsOptional } from "class-validator";
import { NotificationChannel, NotificationStatus } from "@margazm/database";
import { NotificationSenderResponse } from "./NotificationSenderDto";

export class CreateNotificationDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  recipientContactId: string;

  @IsUUID()
  @IsNotEmpty()
  authorId: string;

  @IsEnum(NotificationChannel)
  @IsNotEmpty()
  channel: NotificationChannel;
}

export class UpdateNotificationDto {
  @IsNotEmpty()
  notificationId: string;

  @IsNotEmpty()
  authorId: string;

  @IsNotEmpty()
  recipientContactId: string;

  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  content: string;

  @IsEnum(NotificationStatus)
  @IsOptional()
  status: NotificationStatus;

  @IsEnum(NotificationChannel)
  @IsOptional()
  channel: NotificationChannel;

  @IsOptional()
  sentAt: Date;
}

export class FindOneNotificationDto {
  @IsUUID()
  @IsNotEmpty()
  notificationId: string;

  @IsUUID()
  @IsNotEmpty()
  authorId: string;
}

export class DeleteNotificationDto {
  @IsUUID()
  @IsNotEmpty()
  notificationId: string;

  @IsUUID()
  @IsNotEmpty()
  authorId: string;
}

export class NotificationResponseDto {
  notificationId: string;
  title: string;
  content: string;
  authorId: string;
  recipientContactId: string;
  channel: NotificationChannel;
  createdAt: Date;
  updatedAt: Date;
  sentAt?: Date;
  status: NotificationStatus;
}

export type FullNotificationResponseDto = NotificationResponseDto & {
  deliveryResult?: NotificationSenderResponse;
};
