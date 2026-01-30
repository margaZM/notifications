import { INestApplication } from "@nestjs/common";
import { initTestApp, closeTestApp, resetTestApp, TestAppContext } from "./helpers/test-app.helper";
import { Contact, NotificationChannel, NotificationStatus, User } from "@margazm/database";
import { NotificationsController } from "../src/controllers/notifications.controller";
import {
  mockEmailNotification,
  mockNotificationSenderFailedResponse,
  mockPushNotification,
  mockSmsNotification,
} from "./mocks/test-app.mocks";
import { TwilioSmsSenderStrategy } from "../src/services/strategies/twilio-sms.strategy";
import { SendGridEmailSenderStrategy } from "../src/services/strategies/sendgrid-email.strategy";

describe("notificationsController (e2e)", () => {
  let testContext: TestAppContext;
  let app: INestApplication;
  let notificationsController: NotificationsController;
  let contact: Contact;
  let author: User;

  beforeAll(async () => {
    testContext = await initTestApp();
    app = testContext.app;
    notificationsController = app.get<NotificationsController>(NotificationsController);
  });

  afterAll(async () => {
    await closeTestApp(testContext);
  });

  beforeEach(async () => {
    jest.clearAllMocks();
    const data = await resetTestApp(testContext);
    contact = data.contact;
    author = data.user;
  });

  describe("POST notifications/", () => {
    it("should create a new EMAIL notification successfully", async () => {
      const result = await notificationsController.create({
        ...mockEmailNotification,
        recipientContactId: contact.contactId,
        authorId: contact.authorId,
      });

      expect(result).toBeDefined();
      expect(result.notificationId).toBeDefined();
    });

    it("should create a new SMS notification successfully", async () => {
      const result = await notificationsController.create({
        ...mockSmsNotification,
        recipientContactId: contact.contactId,
        authorId: contact.authorId,
      });

      expect(result).toBeDefined();
      expect(result.notificationId).toBeDefined();
    });

    it("should create a new PUSH notification successfully", async () => {
      const result = await notificationsController.create({
        ...mockPushNotification,
        recipientContactId: contact.contactId,
        authorId: contact.authorId,
      });

      expect(result).toBeDefined();
      expect(result.notificationId).toBeDefined();
    });

    it("should return an error when push notification is invalid", async () => {
      try {
        await notificationsController.create({
          ...mockPushNotification,
          title: mockPushNotification.title.substring(0, 3),
          content: mockPushNotification.content.substring(0, 3),
          recipientContactId: contact.contactId,
          authorId: contact.authorId,
        });
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.statusCode || error.error.statusCode).toBe(400);
      }
    });

    it("should return an error when email notification is invalid", async () => {
      try {
        await notificationsController.create({
          ...mockEmailNotification,
          title: mockEmailNotification.title.substring(0, 3),
          content: mockEmailNotification.content.substring(0, 3),
          recipientContactId: contact.contactId,
          authorId: contact.authorId,
        });
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.statusCode || error.error.statusCode).toBe(400);
      }
    });

    it("should return an error when sms notification is invalid", async () => {
      try {
        await notificationsController.create({
          ...mockSmsNotification,
          title: mockSmsNotification.title.substring(0, 3),
          content: mockSmsNotification.content.substring(0, 3),
          recipientContactId: contact.contactId,
          authorId: contact.authorId,
        });
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.statusCode || error.error.statusCode).toBe(400);
      }
    });

    it("should return error if strategy fails", async () => {
      try {
        const smsStrategy = app.get(TwilioSmsSenderStrategy);
        jest.spyOn(smsStrategy, "send").mockRejectedValueOnce(new Error("Provider Down"));
        await notificationsController.create({
          ...mockSmsNotification,
          recipientContactId: contact.contactId,
          authorId: contact.authorId,
        });
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.statusCode || error.error.statusCode).toBe(400);
      }
    });
  });

  describe("PATCH notifications/", () => {
    it("should update a notification successfully if it not sent", async () => {
      const emailStrategy = app.get(SendGridEmailSenderStrategy);
      const emailSpy = jest
        .spyOn(emailStrategy, "send")
        .mockResolvedValueOnce(mockNotificationSenderFailedResponse);

      const created = await notificationsController.create({
        ...mockEmailNotification,
        recipientContactId: contact.contactId,
        authorId: author.userId,
      });

      expect(emailSpy).toHaveBeenCalledTimes(1);

      const result = await notificationsController.update({
        ...mockEmailNotification,
        notificationId: created.notificationId,
        recipientContactId: contact.contactId,
        title: "Updated Title Notification",
        content: "Updated Content Notification",
        authorId: author.userId,
        status: created.status,
        sentAt: created.sentAt,
      });

      expect(emailSpy).toHaveBeenCalledTimes(2);
      expect(result.status).toBe(NotificationStatus.SENT);
      expect(result.title).toBe("Updated Title Notification");
      expect(result.content).toBe("Updated Content Notification");
    });

    it("should return an error if notification is sent", async () => {
      const created = await notificationsController.create({
        ...mockEmailNotification,
        recipientContactId: contact.contactId,
        authorId: author.userId,
      });
      try {
        await notificationsController.update({
          ...mockEmailNotification,
          notificationId: created.notificationId,
          recipientContactId: contact.contactId,
          title: "Updated Title",
          content: "Updated Content",
          authorId: author.userId,
          sentAt: created.sentAt,
          status: created.status,
        });
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.statusCode || error.error.statusCode).toBe(400);
      }
    });

    it("should return an error if notification does not exist", async () => {
      try {
        await notificationsController.update({
          ...mockEmailNotification,
          notificationId: "non-existent-notification",
          recipientContactId: contact.contactId,
          authorId: contact.authorId,
          sentAt: new Date(),
          status: "PENDING",
        });
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.statusCode || error.error.statusCode).toBe(404);
      }
    });
  });

  describe("GET_ALL notifications", () => {
    it("should return all notifications for a specific author", async () => {
      await notificationsController.create({
        ...mockSmsNotification,
        recipientContactId: contact.contactId,
        authorId: contact.authorId,
      });

      await notificationsController.create({
        ...mockEmailNotification,
        recipientContactId: contact.contactId,
        authorId: contact.authorId,
      });

      const results = await notificationsController.getAll(author.userId);

      expect(Array.isArray(results)).toBe(true);
      expect(results).toHaveLength(2);
    });

    it("should return empty array if author has no notifications", async () => {
      const results = await notificationsController.getAll("non-existent-author");
      expect(results).toEqual([]);
    });
  });

  describe("GET_BY_ID notification", () => {
    it("should return a notification by its ID", async () => {
      const created = await notificationsController.create({
        ...mockEmailNotification,
        recipientContactId: contact.contactId,
        authorId: contact.authorId,
      });
      const result = await notificationsController.getById({
        notificationId: created.notificationId,
        authorId: author.userId,
      });

      expect(result).toBeDefined();
      expect(result.notificationId).toBe(created.notificationId);
      expect(result.authorId).toBe(author.userId);
    });

    it("should throw error if notification does not exist", async () => {
      try {
        await notificationsController.getById({
          notificationId: "non-existent-notification",
          authorId: author.userId,
        });
      } catch (error: any) {
        expect(error).toBeDefined();
        expect(error.statusCode || error.error.statusCode).toBe(404);
      }
    });
  });

  describe("DELETE notification", () => {
    it("should remove a notification successfully", async () => {
      const created = await notificationsController.create({
        ...mockSmsNotification,
        recipientContactId: contact.contactId,
        authorId: contact.authorId,
      });
      await notificationsController.delete({
        notificationId: created.notificationId,
        authorId: author.userId,
      });

      await expect(
        notificationsController.getById({
          notificationId: created.notificationId,
          authorId: author.userId,
        }),
      ).rejects.toThrow();
    });
  });
});
