import { NextAuthRequest, NextAuthResponse } from "./types";
import { decrypt } from "../utils";
import { getCookie } from "../cookies";
import { AuthError } from "../errors";

const authorize = (handler: Function, secret: string) => async (
  req: NextAuthRequest,
  res: NextAuthResponse
) => {
  try {
    const token = getCookie(req);
    const userObj = decrypt(token, secret);
    const isAuthorized = token != null && userObj != null;

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
