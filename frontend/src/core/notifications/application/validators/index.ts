import * as yup from "yup";
import { NotificationChannel, NotificationStatus } from "../../domain/models/Notification";

export const CHANNEL_RULES = {
  EMAIL: { title: { min: 8, max: 50 }, content: { min: 8, max: 400 } },
  SMS: { title: { min: 6, max: 30 }, content: { min: 6, max: 130 } },
  PUSH: { title: { min: 6, max: 30 }, content: { min: 6, max: 80 } },
} as const;

enum FieldType {
  title = "title",
  content = "content",
}

export const getFieldRules = (field: FieldType, channel: NotificationChannel) => {
  const rules = CHANNEL_RULES[channel];
  return yup.string().min(rules[field].min).max(rules[field].max);
};

export const createNotificationSchema = yup.object({
  title: yup
    .string()
    .when("channel", ([channel], schema) => {
      return channel ? getFieldRules(FieldType.title, channel as NotificationChannel) : schema;
    })
    .required(),
  content: yup
    .string()
    .when("channel", ([channel], schema) => {
      return channel ? getFieldRules(FieldType.content, channel as NotificationChannel) : schema;
    })
    .required(),
  recipientContactId: yup.string().required(),
  channel: yup.string().oneOf(Object.values(NotificationChannel)).required(),
});

export const updateNotificationShema = yup.object({
  title: yup
    .string()
    .when("channel", ([channel], schema) => {
      return channel ? getFieldRules(FieldType.title, channel as NotificationChannel) : schema;
    })
    .required(),
  content: yup
    .string()
    .when("channel", ([channel], schema) => {
      return channel ? getFieldRules(FieldType.content, channel as NotificationChannel) : schema;
    })
    .required(),
  status: yup
    .mixed<NotificationStatus>()
    .oneOf(Object.keys(NotificationStatus) as NotificationStatus[])
    .required(),
  sentAt: yup.date().optional(),
  recipientContactId: yup.string().required(),
  notificationId: yup.string().required(),
  channel: yup.string().oneOf(Object.values(NotificationChannel)).required(),
});
