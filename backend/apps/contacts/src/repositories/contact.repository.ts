import { IContactRepository, ContactEntity } from "./contact-repository.interface";
import { RegisterContactDto } from "../dtos/RegisterContactDto";
import { DatabaseService } from "@margazm/database";

export class ContactRepository implements IContactRepository {
  constructor(private prisma: DatabaseService) {}

  registerContact(data: RegisterContactDto): Promise<ContactEntity> {
    return this.prisma.contact.create({ data });
  }

  getAllContacts(id: string): Promise<ContactEntity[]> {
    return this.prisma.contact.findMany({
      where: { authorId: id },
    });
  }

  getContactByEmail(email: string): Promise<ContactEntity | null> {
    return this.prisma.contact.findUnique({
      where: { email },
    });
  }

  getContactByPhoneNumber(phoneNumber: string): Promise<ContactEntity | null> {
    return this.prisma.contact.findUnique({
      where: { phoneNumber },
    });
  }

  getContactById(id: string): Promise<ContactEntity | null> {
    return this.prisma.contact.findUnique({
      where: { contactId: id },
    });
  }

  deleteContact(id: string): Promise<ContactEntity> {
    return this.prisma.contact.delete({
      where: { contactId: id },
    });
  }
}
