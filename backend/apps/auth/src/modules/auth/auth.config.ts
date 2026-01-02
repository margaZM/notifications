import { Injectable } from "@nestjs/common";

@Injectable()
export class ConfigService {
  private readonly envConfig: { [key: string]: any } = {};

  constructor() {
    this.envConfig = {
      PORT: process.env.AUTH_SERVICE_PORT,
      JWT_SECRET: process.env.JWT_SECRET,
      JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
      DATABASE_URL: process.env.DATABASE_URL,
    };
  }

  get(key: string): any {
    const value = process.env[key];
    if (!value) {
      throw new Error(`Configuration key ${key} requested but is undefined.`);
    }
    return value;
  }
}
