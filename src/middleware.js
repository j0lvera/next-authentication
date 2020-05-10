import { authenticate, setCookie } from "./index";

/**
 * @param {Function} verify
 * @example
 *
 * const verify = (username, password) {
 *   return db.User.query().findOne({ username });
 * };
 *
 * export default nextAuth(verify)(req, res) => {
 *   res.end();
 * });
 *
 * @returns {function(*): function(*=, *=): *}
 */
const nextAuth = (verify) => (fn) => {
  console.log("step 1");
  return async (req, res) => {
    console.log("step 2");
    try {
      console.log("step 3");
      const user = await authenticate(req, verify);
      // TODO
      // [ ] - Create a token with user id
      const token = user.id;
      // [ ] - Save a session with the token
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
