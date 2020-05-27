import {
  NextAuthRequest,
  NextAuthResponse,
  AuthorizeOptions,
  AuthorizeArgs,
  PropsContext,
} from "./types";
import { decrypt } from "../utils";
import { getCookie, deleteCookie } from "../cookies";
import { AuthError } from "../errors";

const authorize = (handler: Function, options: AuthorizeOptions) => async (
  ...args: AuthorizeArgs
): Promise<Function | undefined> => {
  const isApi = args.length > 1;

  // One argument means we are in `getServerSideProps` and `context` is passed,
  // otherwise we are in an API route and `req` and `res` are passed instead.
  const req = isApi
    ? (args[0] as NextAuthRequest)
    : (args[0] as PropsContext).req;
  const res = isApi
    ? (args[1] as NextAuthResponse)
    : (args[0] as PropsContext).res;

  try {
    const token = getCookie(req);
    const userObj = decrypt(token, options.secret);

    // false on empty strings
    const isAuthorized = Boolean(token) && Boolean(userObj);

    if (!isAuthorized) {
      throw new AuthError("Invalid credentials", 403);
    }

    req.user = userObj;
    req.authorized = isAuthorized;

    return isApi ? handler(req, res) : handler(args[0]);
  } catch (error) {
    deleteCookie(res);

    if (isApi) {
      res.statusCode = error.status ?? 500;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ message: error.message }));
      return;
    }

    // getServerSideProps
    if (options.redirectOnError) {
      res.writeHead(301, { Location: options.redirectUrl });
      res.end();
      return;
    }

    req.user = JSON.stringify({ username: null });
    req.authorized = false;
    return handler(args[0]);
  }
};

export { authorize };
