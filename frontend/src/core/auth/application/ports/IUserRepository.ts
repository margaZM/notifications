import { AuthUserDto, AuthUserOutputDto } from "../../infrastructure/dtos/AuthUserDto";

export interface IUserRepository {
  registerUser: (data: AuthUserDto) => Promise<AuthUserOutputDto>;
  loginUser: (data: AuthUserDto) => Promise<AuthUserOutputDto>;
}
