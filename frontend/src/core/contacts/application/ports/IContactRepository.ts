import { Contact } from "../../domain/models/Contact";
import { RegisterContactDto } from "../../infrastructure/dtos/RegisterContactDto";

export interface IContactRepository {
  registerContact: (data: RegisterContactDto) => Promise<Contact>;
  getAllContacts: () => Promise<Contact[]>;
  deleteContact: (contactId: string) => Promise<void>;
}
