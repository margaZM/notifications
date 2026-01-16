import { isValidEmail } from "@/src/shared/utils/validators";
import { AuthUserDto } from "../../infrastructure/dtos/AuthUserDto";
import { IUserRepository } from "../ports/IUserRepository";
import { ValidationError } from "@/src/core/shared/domain/errors/ValidationError";

export class RegisterUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(userData: AuthUserDto) {
    if (!userData.email || !isValidEmail(userData.email)) {
      throw new ValidationError("Should be a valid email.");
    }
    if (!userData.password) {
      throw new ValidationError("Password is required.");
    }
    return await this.userRepository.registerUser(userData);
  }
}
