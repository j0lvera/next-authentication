// @ts-check

import { setCookie, getCookie, encrypt } from "./cookies";

/**
 * @param {ServerResponse} res
 * @param {string} value
 * @param {Function} callback
 */
async function logIn(res, verify) {
  // TODO
  // 1. Verify the credentials using the user's `verify` function
  // 2. If verified then
  //   2.1 Encrypts user id or a random uuid
  //   2.2 Generate JWT
  //   2.3 Set cookie with JWT
  // 3. Else
  //   3.1 Return unauthorized error (Not sure if I should throw an exception or return the status code directl
}

function logout(ctx, callback) {
  // TODO
}

export { getCookie, logout, logIn, setCookie };
