import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import { DatabaseService } from "@margazm/database";
import { AppModule } from "../../src/app.module";
import { AuthService } from "../../src/modules/auth/services/auth.service";
import { USERS_REPOSITORY_PORT } from "../../src/modules/user/user.constants";
import { HASHER_PORT, TOKEN_GENERATOR_PORT } from "../../src/modules/auth/auth.constants";
import { UserRepository } from "../../src/modules/user/repositories/user.repositories";
import { HasherService } from "../../src/modules/auth/services/hasher.service";
import { TokenGeneratorService } from "../../src/modules/auth/services/token-generator.service";

export interface TestAppContext {
  app: INestApplication;
  database: DatabaseService;
}

export async function initTestApp(): Promise<TestAppContext> {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
    providers: [
      AuthService,
      { provide: USERS_REPOSITORY_PORT, useClass: UserRepository },
      { provide: HASHER_PORT, useClass: HasherService },
      { provide: TOKEN_GENERATOR_PORT, useClass: TokenGeneratorService },
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

  if (app) await app.close();
}

export async function resetTestApp(context: TestAppContext): Promise<void> {
  const { database } = context;
  await database.$transaction([database.user.deleteMany()]);
}
