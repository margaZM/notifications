import { Module } from "@nestjs/common";
import { ContactsController } from "./controllers/contacts.controller";
import { ContactsService } from "./services/contacts.service";
import { ConfigModule } from "@nestjs/config";
import { CONTACTS_REPOSITORY_PORT } from "./app.constants";
import { ContactRepository } from "./repositories/contact.repository";
import { DatabaseModule } from "./database/database.module";
import { DatabaseService } from "@margazm/database";
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
  ],
  controllers: [ContactsController],
  providers: [
    ContactsService,
    {
      provide: CONTACTS_REPOSITORY_PORT,
      useFactory: (prisma: DatabaseService) => new ContactRepository(prisma),
      inject: [DatabaseService],
    },
  ],
  exports: [CONTACTS_REPOSITORY_PORT],
})
export class ContactsModule {}
