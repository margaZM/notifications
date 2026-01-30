import { NotificationChannel, NotificationStatus } from "@margazm/database";

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

export const mockContactCreatedResponse = {
  contactId: "uuid-contact",
  email: "testrecipient@example.com",
  phoneNumber: "123456789",
  deviceToken: "03df25c845d460bcdad7802d2vf6fc1dfde97283bf75cc993eb6dca835ea2e2f",
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const mockNotificationSenderSuccessResponse = {
  status: NotificationStatus.SENT,
  sendAt: new Date(),
};

export const mockNotificationSenderFailedResponse = {
  status: NotificationStatus.FAILED,
  sendAt: new Date(),
};
