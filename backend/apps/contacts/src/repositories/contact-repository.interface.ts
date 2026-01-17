import { RegisterContactDto } from "../dtos/RegisterContactDto";

export interface ContactEntity {
  contactId: string;
  email: string;
  phoneNumber: string;
  deviceToken: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IContactRepository {
  registerContact: (data: RegisterContactDto) => Promise<ContactEntity>;
  getContactByEmail: (email: string) => Promise<ContactEntity | null>;
  getContactByPhoneNumber: (phoneNumber: string) => Promise<ContactEntity | null>;
  getContactById: (id: string) => Promise<ContactEntity | null>;
  getAllContacts: (id: string) => Promise<ContactEntity[]>;
  deleteContact: (id: string) => Promise<ContactEntity>;
}
