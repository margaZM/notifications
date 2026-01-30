import { NotificationsModule } from "./../../src/app.module";
import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import { Contact, DatabaseService, User } from "@margazm/database";
import { CONTACTS_SERVICE } from "@margazm/common";
import { of } from "rxjs";
import { mockValidContact, mockValidUser } from "../../test/mocks/test-app.mocks";
import { SendGridEmailSenderStrategy } from "../../src/services/strategies/sendgrid-email.strategy";
import { TwilioSmsSenderStrategy } from "../../src/services/strategies/twilio-sms.strategy";
import { PushNotificationSenderStrategy } from "../../src/services/strategies/push.strategy";
import {
  mockContactCreatedResponse,
  mockNotificationSenderSuccessResponse,
} from "../../test/mocks/test-app.mocks";

export interface TestAppContext {
  app: INestApplication;
  database: DatabaseService;
}

export async function initTestApp(): Promise<TestAppContext> {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [NotificationsModule],
  })
    .overrideProvider(CONTACTS_SERVICE)
    .useValue({
      send: jest.fn().mockImplementation(() => of(mockContactCreatedResponse)),
    })
    .overrideProvider(SendGridEmailSenderStrategy)
    .useValue({
      send: jest.fn().mockResolvedValue(mockNotificationSenderSuccessResponse),
    })
    .overrideProvider(TwilioSmsSenderStrategy)
    .useValue({
      send: jest.fn().mockResolvedValue(mockNotificationSenderSuccessResponse),
    })
    .overrideProvider(PushNotificationSenderStrategy)
    .useValue({
      send: jest.fn().mockResolvedValue(mockNotificationSenderSuccessResponse),
    })
    .compile();

  const app = moduleFixture.createNestApplication();

  const database = moduleFixture.get<DatabaseService>(DatabaseService);

  await app.init();

  return { app, database };
}

export async function closeTestApp(context: TestAppContext): Promise<void> {
  const { app } = context;

  await app.close();
}

export async function resetTestApp(
  context: TestAppContext,
): Promise<{ contact: Contact; user: User }> {
  const { database } = context;

  await database.contact.deleteMany();
  await database.user.deleteMany();

  const user = await database.user.create({
    data: mockValidUser,
  });

  const contact = await database.contact.create({
    data: { ...mockValidContact, authorId: user.userId },
  });

  return { contact, user };
}
