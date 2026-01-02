import * as bcrypt from "bcryptjs";
import { IHasher } from "../ports/hasher.port";

export class HasherService implements IHasher {
  private readonly saltRounds: number = 10;

  async hash(plaintext: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return bcrypt.hash(plaintext, salt);
  }

  async compare(plaintext: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plaintext, hash);
  }
}
