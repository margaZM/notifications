import { IUserRepository, UserEntity } from "./user-repository.interface";
import { RegisterUserDto } from "../../auth/dtos/RegisterUserDto";
import { Injectable } from "@nestjs/common";
import { DatabaseService } from "@margazm/database";

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private prisma: DatabaseService) {}

  registerUser(data: RegisterUserDto): Promise<UserEntity> {
    return this.prisma.user.create({ data });
  }

  getUserByEmail(email: string): Promise<UserEntity | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  getUserById(id: string): Promise<UserEntity | null> {
    return this.prisma.user.findUnique({
      where: { userId: id },
    });
  }
}
