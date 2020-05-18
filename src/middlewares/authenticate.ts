import { ServerResponse } from "http";
import * as jwt from "jsonwebtoken";
import { setCookie } from "../cookies";
import { encrypt, parseBody } from "../utils";
import { NextAuthOptions, Request } from "./types";
import { AuthError } from "../errors";

const authenticate = ({
  verify,
  secret,
  expiresIn = "6h",
}: NextAuthOptions) => (fn: Function) => async (
  req: Request,
  res: ServerResponse
) => {
  try {
    // `req.body` comes parsed using API middlewares. But in case the user
    // turned off the parsing option, we run our own parser.
    // https://nextjs.org/docs/api-routes/api-middlewares
    const { username, password } = req.body ?? (await parseBody(req));

    if (!username || !password) {
      throw new AuthError("Credentials are missing");
    }

    const user = await verify(username, password);
    const payload = { session: encrypt(user, secret) };
    const token = jwt.sign(payload, `${secret}`, {
      expiresIn,
    });

    setCookie(res, token);

    return fn(req, res);
  } catch (error) {
    res.statusCode = error.status ?? 500;
    res.end(error.message);
  }
};

export { authenticate };
