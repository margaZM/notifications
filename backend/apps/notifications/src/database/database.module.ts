import { Global, Module } from "@nestjs/common";
import { DatabaseService } from "@margazm/database"; // Ajusta la ruta a tu archivo actual

@Global()
@Module({
  providers: [
    {
      provide: DatabaseService,
      useFactory: () => {
        return DatabaseService.getInstance();
      },
    },
  ],
  exports: [DatabaseService],
})
export class DatabaseModule {}
