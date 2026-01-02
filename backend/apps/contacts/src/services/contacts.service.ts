import { Inject, Injectable, UnauthorizedException, ConflictException } from "@nestjs/common";
import { RegisterContactDto } from "../dtos/RegisterContactDto";
import { CONTACTS_REPOSITORY_PORT } from "../app.constants";
import { type IContactRepository } from "../repositories/contact-repository.interface";
import { ContactOutput } from "../dtos/ContactOutput";

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
      throw new ConflictException("This contact already exists.");
    }

    return await this.contactRepository.registerContact(data);
  }

  async delete(id: string): Promise<ContactOutput> {
    const contactRegistered = await this.contactRepository.getContactById(id);

    if (!contactRegistered) {
      throw new UnauthorizedException("Contact does not exists.");
    }

    return await this.contactRepository.deleteContact(id);
  }

  async getById(id: string): Promise<ContactOutput> {
    const contactRegistered = await this.contactRepository.getContactById(id);
    if (!contactRegistered) {
      throw new UnauthorizedException("Contact does not exists.");
    }
    return contactRegistered;
  }
}
