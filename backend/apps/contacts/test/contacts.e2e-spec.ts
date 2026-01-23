import { INestApplication } from "@nestjs/common";
import { initTestApp, closeTestApp, resetTestApp, TestAppContext } from "./helpers/test-app.helper";
import { ContactsController } from "../src/controllers/contacts.controller";
import { User } from "@margazm/database";
import { mockSecondContact, mockValidContact } from "./mocks/test-app.mocks";

describe("contactsController (e2e)", () => {
  let testContext: TestAppContext;
  let app: INestApplication;
  let contactsController: ContactsController;
  let author: User;

  beforeAll(async () => {
    testContext = await initTestApp();
    app = testContext.app;
    contactsController = app.get<ContactsController>(ContactsController);
  });

  afterAll(async () => {
    await closeTestApp(testContext);
  });

  beforeEach(async () => {
    author = await resetTestApp(testContext);
  });

  describe("POST contacts/register", () => {
    it("should register a new contact successfully", async () => {
      const result = await contactsController.register({
        ...mockValidContact,
        authorId: author.userId,
      });

      expect(result).toBeDefined();
      expect(result.contactId).toBeDefined();
      expect(result.email).toBe(mockValidContact.email);
      expect(result.phoneNumber).toBe(mockValidContact.phoneNumber);
    });

    it("should return an error if the contact email is invalid", async () => {
      try {
        await contactsController.register({
          ...mockValidContact,
          authorId: author.userId,
          email: "invalid-email",
        });
      } catch (error: any) {
        expect(error.message).toContain("Invalid email");
        expect(error.statusCode || error.error.statusCode).toBe(400);
      }
    });

    it("should return an error if the phone number is invalid", async () => {
      try {
        await contactsController.register({
          ...mockValidContact,
          authorId: author.userId,
          phoneNumber: "123",
        });
      } catch (error: any) {
        expect(error.message).toContain("Invalid password");
        expect(error.statusCode || error.error.statusCode).toBe(400);
      }
    });
  });

  describe("GET_ALL contacts", () => {
    it("should return all contacts for a specific author", async () => {
      await contactsController.register({ ...mockValidContact, authorId: author.userId });
      await contactsController.register({
        ...mockSecondContact,
        authorId: author.userId,
      });

      const results = await contactsController.getAll(author.userId);

      expect(Array.isArray(results)).toBe(true);
      expect(results).toHaveLength(2);
    });

    it("should return empty array if author has no contacts", async () => {
      const results = await contactsController.getAll("non-existent-author");
      expect(results).toEqual([]);
    });
  });

  describe("GET_BY_ID contact", () => {
    it("should return a contact by its ID", async () => {
      const created = await contactsController.register({
        ...mockValidContact,
        authorId: author.userId,
      });
      const result = await contactsController.getById(created.contactId);

      expect(result).toBeDefined();
      expect(result.contactId).toBe(created.contactId);
    });

    it("should throw error if contact does not exist", async () => {
      try {
        await contactsController.getById("invalid-uuid");
      } catch (error: any) {
        expect(error).toBeDefined();
      }
    });
  });

  describe("DELETE contact", () => {
    it("should remove a contact successfully", async () => {
      const created = await contactsController.register({
        ...mockValidContact,
        authorId: author.userId,
      });
      await contactsController.delete(created.contactId);
      await expect(contactsController.getById(created.contactId)).rejects.toThrow();
    });
  });
});
