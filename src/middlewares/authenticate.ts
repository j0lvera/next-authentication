import { ServerResponse } from "http";
import { setCookie } from "../cookies";
import { encrypt, parseBody } from "../utils";
import { NextAuthRequest, VerifyFunction } from "./types";
import { AuthError } from "../errors";
import { CookieSerializeOptions } from "cookie";

const authenticate = (
  fn: Function,
  verify: VerifyFunction,
  secret: string,
  cookieOptions: CookieSerializeOptions
) => async (req: NextAuthRequest, res: ServerResponse) => {
  try {
    // `req.body` comes parsed using API middleware. But in case the user
    // turned off the parsing option, we run our own parser.
    // https://nextjs.org/docs/api-routes/api-middlewares
    const { username, password } = req.body ?? (await parseBody(req));

    if (!username || !password) {
      throw new AuthError("Missing credentials");
    }

    const user = await verify(username, password);
    const token = encrypt(user, secret);

    setCookie(res, token, cookieOptions);

    return fn(req, res);
  } catch (error) {
    res.statusCode = error.status ?? 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: error.message }));
  }
};

export { authenticate };
