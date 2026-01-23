import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import { DatabaseService, User } from "@margazm/database";
import { ContactsModule } from "../../src/app.module";
import { ContactsService } from "../../src/services/contacts.service";
import { CONTACTS_REPOSITORY_PORT } from "../../src/app.constants";
import { ContactRepository } from "../../src/repositories/contact.repository";
import { mockValidUser } from "../../test/mocks/test-app.mocks";

export interface TestAppContext {
  app: INestApplication;
  database: DatabaseService;
}

export async function initTestApp(): Promise<TestAppContext> {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [ContactsModule],
    providers: [
      ContactsService,
      { provide: CONTACTS_REPOSITORY_PORT, useClass: ContactRepository },
    ],
  }).compile();

  const app = moduleFixture.createNestApplication();

  const database = moduleFixture.get<DatabaseService>(DatabaseService);

  await app.init();

  return {
    app,
    database,
  };
}

export async function closeTestApp(context: TestAppContext): Promise<void> {
  const { app } = context;

  await app.close();
}

export async function resetTestApp(context: TestAppContext): Promise<User> {
  const { database } = context;

  await database.contact.deleteMany();
  await database.user.deleteMany();

  return await database.user.create({
    data: mockValidUser,
  });
}
