import { AuthorizeOptions, NextAuthOptions } from "./middlewares/types";
import { authenticate, authorize } from "./middlewares";

interface NextAuthObject {
  authenticate: (handler: Function) => Function;
  authorize: (handler: Function) => Function;
}

const cookieDefaultOptions = {
  httpOnly: true,
  maxAge: 60 * 60 * 24 * 7, // 1 week,
  path: "/",
};

function nextAuth({
  verify,
  secret,
  cookieOptions = cookieDefaultOptions,
  redirectOnError = true,
  redirectUrl = "/login",
}: NextAuthOptions): NextAuthObject {
  const authorizeOptions: AuthorizeOptions = {
    secret,
    redirectOnError,
    redirectUrl,
  };

  return {
    authenticate: (handler: Function): Function =>
      authenticate(handler, verify, secret, cookieOptions),
    authorize: (handler: Function): Function =>
      authorize(handler, authorizeOptions),
  };
}

export { nextAuth };
