import * as jwt from "jsonwebtoken";
import { encrypt } from "../cookies";

function generateToken(
  value: string,
  expiresIn: string,
  secret: string
): string {
  return jwt.sign(
    {
      data: encrypt(value),
    },
    "secret",
    { expiresIn: "1h" }
  );
}

export { generateToken };
