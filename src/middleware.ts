import { ServerResponse } from "http";
import * as jwt from "jsonwebtoken";
import { authenticate } from "./authentication";
import { Request, VerifyFunction } from "./authentication/types";
import { encrypt, setCookie } from "./cookies";

const nextAuth = (verify: VerifyFunction) => (fn: Function) => {
  return async (req: Request, res: ServerResponse) => {
    try {
      const user = await authenticate(req, verify);
      // TODO
      // [ ] - Check if type of authenticate is string otherwise stringify
      // [x] - Create a token with user id
      const token = jwt.sign(
        { session: encrypt(JSON.stringify(user)) },
        "secret",
        {
          expiresIn: "1h",
        }
      );
      // [x] - Save a session with the token
      setCookie(res, token);
      return fn(req, res);
    } catch (error) {
      res.statusCode = error.status ?? 500;
      res.end(error.message);
    }
  };
};

export { nextAuth };
