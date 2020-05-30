import { AuthorizeOptions, NextAuthOptions } from "./middlewares/types";
import { authenticate, authorize, logout } from "./middlewares";
import { AuthError } from "./errors";

interface NextAuthObject {
  authenticate: (handler: Function) => Function;
  authorize: (handler: Function) => Function;
  logout: (handler: Function) => Function;
}

const cookieDefaultOptions = {
  httpOnly: true,
  maxAge: 60 * 60 * 24, // 24 hours
  path: "/",
};

function nextAuth({
  verify,
  secret,
  cookieUserOptions = {},
  redirectOnError = true,
  redirectUrl = "/login",
}: NextAuthOptions): NextAuthObject {
  const authorizeOptions: AuthorizeOptions = {
    secret,
    redirectOnError,
    redirectUrl,
  };

  const cookieOptions = {
    ...cookieDefaultOptions,
    cookieUserOptions,
  };

  return {
    authenticate: (handler: Function): Function =>
      authenticate(handler, verify, secret, cookieOptions),
    authorize: (handler: Function): Function =>
      authorize(handler, authorizeOptions),
    logout: (handler: Function): Function => logout(handler, authorizeOptions),
  };
}

export { nextAuth, AuthError };
