import { Injectable } from "@nestjs/common";
import { HashGenerator } from "../ports/hash-generator.interface";
import * as crypto from "crypto";

@Injectable()
export class HasherService implements HashGenerator {
  generate(data: Record<string, any>): string {
    const sortedData = Object.keys(data)
      .sort()
      .reduce((obj, key) => {
        obj[key] = data[key];
        return obj;
      }, {});

    const str = JSON.stringify(sortedData);
    return crypto.createHash("sha256").update(str).digest("hex");
  }
}
