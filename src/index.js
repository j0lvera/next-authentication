// @ts-check

import { setCookie, getCookie } from "./cookies";
import { AuthError } from "./errors";

/**
 * Requires a `verify` function that accepts username and password and returns a
 * user object or a falsy value.
 *
 * `req.body` comes parsed using API middlewares.
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

function nextAuth(options) {
  // TODO
}

export { authenticate, getCookie, logout, logIn, setCookie, nextAuth };
