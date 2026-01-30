import { Module } from "@nestjs/common";
import { UserRepository } from "./repositories/user.repositories";
import { USERS_REPOSITORY_PORT } from "./user.constants";
import { DatabaseModule } from "../database/database.module";
import { DatabaseService } from "@margazm/database";

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: USERS_REPOSITORY_PORT,
      useFactory: (prisma: DatabaseService) => new UserRepository(prisma),
      inject: [DatabaseService],
    },
  ],
  exports: [USERS_REPOSITORY_PORT],
})
export class UserModule {}
