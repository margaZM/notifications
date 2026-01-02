import { Module } from "@nestjs/common";
import { UserRepository } from "./repositories/user.repositories";
import { USERS_REPOSITORY_PORT } from "./user.constants";

@Module({
  providers: [
    UserRepository,
    {
      provide: USERS_REPOSITORY_PORT,
      useClass: UserRepository,
    },
  ],
  exports: [USERS_REPOSITORY_PORT],
})
export class UserModule {}
