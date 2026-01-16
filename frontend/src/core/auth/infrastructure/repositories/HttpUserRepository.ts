import { ApiService } from "@/src/core/shared/infrastructure/api/ApiService";
import { IUserRepository } from "../../application/ports/IUserRepository";
import { AuthUserDto, AuthUserOutputDto } from "../dtos/AuthUserDto";

export class UserRepository implements IUserRepository {
  constructor(private readonly apiService: ApiService) {}

  registerUser(data: AuthUserDto): Promise<AuthUserOutputDto> {
    return this.apiService.post<AuthUserOutputDto>("/auth/register", data);
  }

  loginUser(data: AuthUserDto): Promise<AuthUserOutputDto> {
    return this.apiService.post<AuthUserOutputDto>("/auth/login", data);
  }
}
