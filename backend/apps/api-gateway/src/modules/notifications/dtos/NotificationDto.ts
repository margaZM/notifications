import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { IsAllowedChannel, IsChannelFieldValid } from "../notification.validator";
import { NotificationChannel, NotificationStatus } from "@margazm/database";

const SUPPORTED_CHANNELS = Object.values(NotificationChannel);

export class CreateNotificationDto {
  @ApiProperty({ example: "Notification title" })
  @IsString()
  @IsNotEmpty()
  @IsChannelFieldValid("title")
  title!: string;

  @ApiProperty({ example: "Notification content..." })
  @IsString()
  @IsNotEmpty()
  @IsChannelFieldValid("content")
  content!: string;

  @ApiProperty({ example: "Contact UUID" })
  @IsUUID()
  recipientContactId!: string;

  @ApiProperty({ enum: NotificationChannel, example: "EMAIL" })
  @IsAllowedChannel(SUPPORTED_CHANNELS)
  channel!: NotificationChannel;
}

export class UpdateNotificationDto extends PartialType(CreateNotificationDto) {
  @ApiProperty({ enum: NotificationStatus, example: "SENT", required: true })
  @IsEnum(NotificationStatus)
  status: NotificationStatus;
}

export class NotificationResponseDto {
  @ApiProperty({
    example: "Notification uuid.",
    description: "Unique notification ID.",
  })
  notificationId!: string;

  @ApiProperty({
    example: "Notification title",
  })
  title!: string;

  @ApiProperty({
    example: "This is the content of a notification.",
  })
  content!: string;

  @ApiProperty({
    example: "Author notification UUID.",
    description: "Unique author ID.",
  })
  authorId!: string;

  @ApiProperty({
    example: "Recipient notification UUID.",
    description: "Unique recipient ID.",
  })
  recipientContactId!: string;

  @ApiProperty({ enum: NotificationChannel, example: "EMAIL" })
  channel!: NotificationChannel;

  @ApiProperty({
    example: "2025-12-04T19:41:28.469Z",
    description: "Notification creation date",
  })
  createdAt!: Date;

  @ApiProperty({
    example: "2025-12-04T19:41:28.469Z",
    description: "Notification update date",
  })
  updatedAt!: Date;

  @ApiProperty({
    example: "2025-12-04T19:41:28.469Z",
    description: "Notification update date",
  })
  status!: NotificationStatus;

  @ApiProperty({
    example: "2025-12-04T19:41:28.469Z",
    description: "Notification send date",
  })
  sendAt!: Date;
}
