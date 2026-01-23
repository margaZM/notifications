import { PrismaClient } from "../dist/generated/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

export class DatabaseService extends PrismaClient {
  private static instance: DatabaseService;
  private static pool: Pool;

  constructor() {
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
      throw new Error("Not found DATABASE_URL in environment variables");
    }

    if (!DatabaseService.pool) {
      DatabaseService.pool = new Pool({
        connectionString,
      });
    }

    const adapter = new PrismaPg(DatabaseService.pool);

    super({
      adapter,
      // log:
      // 	process.env.NODE_ENV === 'test' ? ['error'] : ['query', 'info', 'warn', 'error'],
    });
  }

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  async onModuleInit() {
    try {
      await this.$connect();
      console.log("Successfully connected to the database via PG Adapter");
    } catch (error) {
      console.error("Failed to connect to the database", error);
      throw error;
    }
  }

  async onModuleDestroy() {
    try {
      await this.$disconnect();
      await DatabaseService.pool.end();
      console.log("Disconnected from the database");
    } catch (error) {
      console.error("Error during database disconnection", error);
    }
  }
}

export const dbProvider = DatabaseService.getInstance();
