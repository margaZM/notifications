import { Inject, Injectable } from "@nestjs/common";
import { RegisterContactDto } from "../dtos/RegisterContactDto";
import { CONTACTS_REPOSITORY_PORT } from "../app.constants";
import { type IContactRepository } from "../repositories/contact-repository.interface";
import { ContactOutput } from "../dtos/ContactOutput";
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class ContactsService {
  constructor(
    @Inject(CONTACTS_REPOSITORY_PORT)
    private readonly contactRepository: IContactRepository,
  ) {}

  async register(data: RegisterContactDto): Promise<ContactOutput> {
    const { email, phoneNumber } = data;

    const emailExists = await this.contactRepository.getContactByEmail(email);
    const phoneNumberExists = await this.contactRepository.getContactByPhoneNumber(phoneNumber);

    if (emailExists || phoneNumberExists) {
      throw new RpcException({
        message: `${emailExists ? "Email" : "Phone number"} already exists.`,
        statusCode: 409,
      });
    }

    return await this.contactRepository.registerContact(data);
  }

  async getAll(id: string): Promise<ContactOutput[]> {
    return await this.contactRepository.getAllContacts(id);
  }

  async delete(id: string): Promise<ContactOutput> {
    const contactRegistered = await this.contactRepository.getContactById(id);

    if (!contactRegistered) {
      throw new RpcException({ message: "Contact does not exists.", statusCode: 404 });
    }
    return await this.contactRepository.deleteContact(id);
  }

  async getById(id: string): Promise<ContactOutput> {
    const contactRegistered = await this.contactRepository.getContactById(id);
    if (!contactRegistered) {
      throw new RpcException({ message: "Contact does not exists.", statusCode: 404 });
    }
    return contactRegistered;
  }
}
