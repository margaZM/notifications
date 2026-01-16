import { isValidEmail } from "@/src/shared/utils/validators";
import { RegisterContactDto } from "../../infrastructure/dtos/RegisterContactDto";
import { IContactRepository } from "../ports/IContactRepository";
import { ValidationError } from "@/src/core/shared/domain/errors/ValidationError";

export class RegisterContactUseCase {
  constructor(private contactRepository: IContactRepository) {}

  async execute(data: RegisterContactDto) {
    if (!data.email || !isValidEmail(data.email)) {
      throw new ValidationError("Should be a valid email.");
    }
    if (!data.phoneNumber || data.phoneNumber.length < 9) {
      throw new ValidationError("Phone number must have at least 9 characters.");
    }
    if (!data.deviceToken || data.deviceToken.length < 255) {
      throw new ValidationError("Device token must have at least 255 characters.");
    }
    return await this.contactRepository.registerContact(data);
  }
}
