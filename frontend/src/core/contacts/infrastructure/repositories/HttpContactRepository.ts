import { ApiService } from "@/src/core/shared/infrastructure/api/ApiService";
import { IContactRepository } from "../../application/ports/IContactRepository";
import { Contact } from "../../domain/models/Contact";
import { RegisterContactDto } from "../dtos/RegisterContactDto";

export class ContactRepository implements IContactRepository {
  constructor(private readonly apiService: ApiService) {}

  registerContact(data: RegisterContactDto): Promise<Contact> {
    return this.apiService.post<Contact>("/contacts/register", data);
  }

  deleteContact(contactId: string): Promise<void> {
    return this.apiService.delete<void>(`/contacts/${contactId}`);
  }

  getAllContacts(): Promise<Contact[]> {
    return this.apiService.get<Contact[]>("/contacts");
  }
}
