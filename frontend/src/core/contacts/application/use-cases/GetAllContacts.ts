import { ValidationError } from "@/src/core/shared/domain/errors/ValidationError";
import { IContactRepository } from "../ports/IContactRepository";

export class GetAllContactsUseCase {
  constructor(private contactRepository: IContactRepository) {}

  async execute() {
    return await this.contactRepository.getAllContacts();
  }
}
