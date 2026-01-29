import { NotificationChannel, NotificationStatus } from "../../domain/models/Notification";
import { generateErrors, valid } from "@/src/shared/utils/validators";

export const CHANNEL_RULES = {
  EMAIL: { title: { min: 8, max: 50 }, content: { min: 8, max: 400 } },
  SMS: { title: { min: 6, max: 30 }, content: { min: 6, max: 130 } },
  PUSH: { title: { min: 6, max: 30 }, content: { min: 6, max: 80 } },
} as const;

export const validateNotificationData = (data: any): string | null => {
  const channel = data.channel as keyof typeof CHANNEL_RULES;

  if (!channel || !CHANNEL_RULES[channel]) {
    return "The channel is required and must be valid";
  }

  const rules = CHANNEL_RULES[channel];

  const validators = {
    channel: [valid.required("channel")],
    contactId: [valid.required("contact")],
    title: [
      valid.required("title"),
      valid.min(rules.title.min, "title"),
      valid.max(rules.title.max, "title"),
    ],
    content: [
      valid.required("content"),
      valid.min(rules.content.min, "content"),
      valid.max(rules.content.max, "content"),
    ],
  };

  const { isValid, errors } = generateErrors(data, validators);

  if (!isValid) {
    const firstKey = Object.keys(errors)[0];
    return errors[firstKey];
  }

  return null;
};

export const validateUpdateNotification = (data: any): string | null => {
  const channel = data.channel as keyof typeof CHANNEL_RULES;

  if (!data.notificationId) return "The notificationId is required";
  if (!channel) return "The channel is required";

  const rules = CHANNEL_RULES[channel];

  const validators = {
    notificationId: [valid.required("notificationId")],
    recipientContactId: [valid.required("recipientContactId")],
    channel: [
      valid.required("channel"),
      valid.oneOf(Object.values(NotificationChannel), "channel"),
    ],
    status: [valid.required("status"), valid.oneOf(Object.keys(NotificationStatus), "status")],
    title: [
      valid.required("title"),
      valid.min(rules.title.min, "title"),
      valid.max(rules.title.max, "title"),
    ],
    content: [
      valid.required("content"),
      valid.min(rules.content.min, "content"),
      valid.max(rules.content.max, "content"),
    ],
  };

  const { isValid, errors } = generateErrors(data, validators);

  if (!isValid) {
    const firstFieldWithError = Object.keys(errors)[0];
    return errors[firstFieldWithError];
  }

  return null;
};
