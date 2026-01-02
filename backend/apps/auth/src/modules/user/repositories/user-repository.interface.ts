import { RegisterUserDto } from '../../auth/dtos/RegisterUserDto';

export interface UserEntity {
  userId: string;
  email: string;
  password: string;
  createdAt: Date;
}
export interface IUserRepository {
  registerUser: (data: RegisterUserDto) => Promise<UserEntity>;
  getUserByEmail: (email: string) => Promise<UserEntity | null>;
  getUserById: (id: string) => Promise<UserEntity | null>;
}