import { ValidationError } from "@/src/core/shared/domain/errors/ValidationError";
import { IContactRepository } from "../ports/IContactRepository";

export class DeleteContactUseCase {
  constructor(private contactRepository: IContactRepository) {}

  async execute(contactId: string) {
    if (!contactId) {
      throw new ValidationError("Contact ID is required to delete a contact");
    }
    return await this.contactRepository.deleteContact(contactId);
  }
}
