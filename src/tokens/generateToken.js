import jwt from "jsonwebtoken";
import { encrypt } from "../cookies";

/**
 * @param {string} value
 * @param {string} expiresIn
 * @param {string} secret
 * @returns {jwt}
 */
function generateToken(value, expiresIn, secret) {
  return jwt.sign(
    {
      data: encrypt(value),
    },
    "secret",
    { expiresIn: "1h" }
  );
}

export default generateToken;
