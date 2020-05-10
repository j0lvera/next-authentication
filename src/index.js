// @ts-check

import { setCookie, getCookie } from "./cookies";
import { AuthError } from "./errors";
import { nextAuth } from "./middleware";
import { parseBody } from "./utils";

/**
 * Requires a `verify` function that accepts username and password and returns a
 * user object or a falsy value.
 *
 * `req.body` comes parsed using API middlewares. But in case the user turned off
 * the parsing option, we run our own parser.
 * https://nextjs.org/docs/api-routes/api-middlewares
 *
 * @param {IncomingMessage} req
 * @param {Function} verify
 * @returns {Object} user
 */
async function authenticate(req, verify) {
  if (!verify) {
    throw new Error("The `verify` function parameter is missing");
  }

  if (!req.body) {
    req.body = await parseBody(req);
  }

  const { username, password } = req.body;

  if (!username || !password) {
    throw new AuthError("Credentials are missing");
  }

  return await verify(username, password);
}

function logIn() {
  // TODO
}

function logout(ctx, callback) {
  // TODO
}

export { authenticate, getCookie, logout, logIn, setCookie, nextAuth };
