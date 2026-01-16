import { IUserRepository } from "../ports/IUserRepository";
export class LogoutUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute() {
    // todo implement logout cookie
  }
}
