import { NotificationChannel } from "@margazm/database";

export const mockValidUser = {
  email: "testauthor@example.com",
  password: "Password123.",
};

export const mockValidContact = {
  email: "testsuser@example.com",
  phoneNumber: "935577632",
  deviceToken: "03df25c845d460bcdad7802d2vf6fc1dfde97283bf75cc993eb6dca835ea2e2f",
};

export const mockBaseNotification = {
  title: "Test Notification",
  content: "This is a test notification",
};

export const mockEmailNotification = {
  ...mockBaseNotification,
  channel: NotificationChannel.EMAIL,
};

export const mockSmsNotification = {
  ...mockBaseNotification,
  channel: NotificationChannel.SMS,
};

export const mockPushNotification = {
  ...mockBaseNotification,
  channel: NotificationChannel.PUSH,
};
