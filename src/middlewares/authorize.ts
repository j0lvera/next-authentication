import { NextAuthRequest, NextAuthResponse } from "./types";
import { decrypt } from "../utils";
import { getCookie } from "../cookies";
import { AuthError } from "../errors";

const authorize = (handler: Function, secret: string) => async (
  req: NextAuthRequest,
  res: NextAuthResponse
): Promise<Function | undefined> => {
  try {
    const token = getCookie(req);
    const userObj = decrypt(token, secret);

    // false on empty strings
    const isAuthorized = Boolean(token) && Boolean(userObj);

    if (!isAuthorized) {
      throw new AuthError("Invalid credentials", 403);
    }

    res.user = userObj;
    res.authorized = isAuthorized;

    return handler(req, res);
  } catch (error) {
    res.statusCode = error.status ?? 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: error.message }));
  }
};

export { authorize };
