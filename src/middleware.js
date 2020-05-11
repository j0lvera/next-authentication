import jwt from "jsonwebtoken";
import { authenticate, setCookie } from "./index";
import { encrypt } from "./cookies";

/**
 * @typedef {function(username, password): Object} Verify
 */

/**
 * @param {Verify} verify
 * @example
 *
 * const verify = (username, password) {
 *   const user = await db.User.query().findOne({ username });
 *
 *   return { user }
 * };
 *
 * export default nextAuth(verify)((req, res) => {
 *   res.end();
 * });
 *
 * @returns {function(handler): function(req, res): *}
 */
const nextAuth = (verify) => (fn) => {
  // TODO
  // * Should I include an `options` object with:
  //   * {Function} `verify`
  //   * {string} `expiresIn`
  //   * {string} `secret`
  console.log("step 1");
  return async (req, res) => {
    console.log("step 2");
    try {
      console.log("step 3");
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
      console.log("error", error);
      res.statusCode = error.status ?? 500;
      res.end(error.message);
    }
  };
};

export { nextAuth };
