import { deleteCookie } from "../cookies";
import {
  AuthorizeArgs,
  LogoutOptions,
  NextAuthRequest,
  NextAuthResponse,
  PropsContext,
} from "./types";

const logout = (handler: Function, options: LogoutOptions) => async (
  ...args: AuthorizeArgs
) => {
  const isApi = args.length > 1;

  // One argument means we are in `getServerSideProps` and `context` is passed,
  // otherwise we are in an API route and `req` and `res` are passed instead.
  const req = isApi
    ? (args[0] as NextAuthRequest)
    : (args[0] as PropsContext).req;
  const res = isApi
    ? (args[1] as NextAuthResponse)
    : (args[0] as PropsContext).res;

  deleteCookie(res);
  req.authorized = false;

  if (options.redirectOnError) {
    res.writeHead(302, { location: options.redirectUrl });
    res.end();
    return;
  }

  return isApi ? handler(req, res) : handler(args[0]);
};

export { logout };
