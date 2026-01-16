import { isValidEmail } from "@/src/shared/utils/validators";
import { AuthUserDto } from "../../infrastructure/dtos/AuthUserDto";
import { IUserRepository } from "../ports/IUserRepository";
import { ValidationError } from "@/src/core/shared/domain/errors/ValidationError";

export class LoginUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(credentials: AuthUserDto) {
    if (!credentials.email || !isValidEmail(credentials.email)) {
      throw new ValidationError("Should be a valid email.");
    }
    if (!credentials.password || credentials.password.length < 6) {
      throw new ValidationError("Password should be at least 6 characters.");
    }
    console.log(credentials, "credentials");
    const response = await this.userRepository.loginUser(credentials);
    console.log(response, "response");
    return response;
  }
}
