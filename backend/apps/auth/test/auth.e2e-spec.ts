import { INestApplication } from "@nestjs/common";
import { initTestApp, closeTestApp, resetTestApp, TestAppContext } from "./helpers/test-app.helper";
import { IUserRepository } from "../src/modules/user/repositories/user-repository.interface";
import { USERS_REPOSITORY_PORT } from "../src/modules/user/user.constants";
import { AuthController } from "../src/modules/auth/controllers/auth.controller";

const validUser = {
  email: "testuser@example.com",
  password: "Password123.",
};

const invalidUser = {
  email: "invalid-email",
  password: "111",
};

describe("authController (e2e)", () => {
  let testContext: TestAppContext;
  let app: INestApplication;
  let authController: AuthController;
  let usersRepository: IUserRepository;

  beforeAll(async () => {
    testContext = await initTestApp();
    app = testContext.app;
    authController = app.get<AuthController>(AuthController);
    usersRepository = app.get<IUserRepository>(USERS_REPOSITORY_PORT);
  });

  afterAll(async () => {
    await closeTestApp(testContext);
  });

  beforeEach(async () => {
    await resetTestApp(testContext);
  });

  describe("POST auth/register", () => {
    it("should register a new user successfully", async () => {
      const result = await authController.register(validUser);

      expect(result).toBeDefined();
      expect(result.token).toBeDefined();
      expect(result.userId).toBeDefined();
      expect(result.email).toBe(validUser.email);
    });

    it("should return an error if the email is invalid", async () => {
      try {
        await authController.register(invalidUser);
      } catch (error: any) {
        expect(error.message).toContain("Invalid email");
        expect(error.statusCode || error.error.statusCode).toBe(400);
      }
    });

    it("should return an error if the password is invalid", async () => {
      try {
        await authController.register(invalidUser);
      } catch (error: any) {
        expect(error.message).toContain("Invalid password");
        expect(error.statusCode || error.error.statusCode).toBe(400);
      }
    });

    it("should return an error if the user already exists", async () => {
      await authController.register(validUser);
      try {
        await authController.register(validUser);
      } catch (error: any) {
        expect(error.message).toContain("User already registered");
        expect(error.statusCode || error.error.statusCode).toBe(400);
      }
    });

    it("should hash the password before storing", async () => {
      await authController.register(validUser);

      const user = await usersRepository.getUserByEmail(validUser.email);
      expect(user).toBeDefined();
      expect(user?.password).not.toBe(validUser.password);
      expect(user?.password).toBeDefined();
    });
  });

  describe("POST auth/login", () => {
    beforeEach(async () => {
      await authController.register(validUser);
    });

    it("should login a registered user with correct credentials", async () => {
      const result = await authController.login(validUser);

      expect(result).toBeDefined();
      expect(result.token).toBeDefined();
      expect(result.userId).toBeDefined();
      expect(result.email).toBe(validUser.email);
    });

    it("should return an error if the email does not exist", async () => {
      try {
        await authController.login({ ...validUser, email: "nonexistent@example.com" });
      } catch (error: any) {
        expect(error.message).toContain("Invalid email or password");
        expect(error.statusCode || error.error.statusCode).toBe(401);
      }
    });

    it("should return an error if the password is incorrect", async () => {
      try {
        await authController.login({ ...validUser, password: "wrong-password" });
      } catch (error: any) {
        expect(error.message).toContain("Invalid email or password");
        expect(error.statusCode || error.error.statusCode).toBe(401);
      }
    });

    it("should return a valid JWT token", async () => {
      const result = await authController.login(validUser);

      expect(result.token).toBeTruthy();
      expect(result.token.split(".")).toHaveLength(3);
    });
  });
});
