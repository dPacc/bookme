import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

// Modify the callback scrypt function to return a promise
const scryptAsync = promisify(scrypt);

export class Password {
  static async toHash(password: string) {
    const salt = randomBytes(16).toString("hex");
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;

    return `${buf.toString("hex")}.${salt}`;
  }

  static async compare(storedPassword: string, suppliedPassword: string) {
    const [hashedPassword, salt] = storedPassword.split(".");
    const buf = (await scryptAsync(hashedPassword, salt, 64)) as Buffer;

    return buf.toString("hex") === hashedPassword;
  }
}
