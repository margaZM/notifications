import { Controller } from "@nestjs/common";
import { ContactsService } from "../services/contacts.service";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { ContactOutput } from "../dtos/ContactOutput";
import { RegisterContactDto } from "../dtos/RegisterContactDto";
import { EVENTS } from "@margazm/common";

@Controller()
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @MessagePattern(EVENTS.CONTACTS.REGISTER)
  async register(@Payload() registerContactDto: RegisterContactDto): Promise<ContactOutput> {
    return this.contactsService.register(registerContactDto);
  }

  @MessagePattern(EVENTS.CONTACTS.FIND_ALL)
  async getAll(@Payload() authorId: string): Promise<ContactOutput[]> {
    return this.contactsService.getAll(authorId);
  }

  @MessagePattern(EVENTS.CONTACTS.DELETE)
  async delete(@Payload() id: string): Promise<ContactOutput> {
    return this.contactsService.delete(id);
  }

  @MessagePattern(EVENTS.CONTACTS.FIND_BY_ID)
  async getById(@Payload() id: string): Promise<ContactOutput> {
    return this.contactsService.getById(id);
  }
}
