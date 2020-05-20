import { NextAuthOptions } from "./middlewares/types";
import { authenticate, authorize } from "./middlewares";

const cookieDefaultOptions = {
  httpOnly: true,
  maxAge: 60 * 60 * 24 * 7, // 1 week,
};

function nextAuth({
  verify,
  secret,
  cookieOptions = cookieDefaultOptions,
}: NextAuthOptions) {
  return {
    authenticate: (handler: Function) =>
      authenticate(handler, verify, secret, cookieOptions),
    authorize: (handler: Function) => authorize(handler, secret),
  };
}

export { nextAuth };
