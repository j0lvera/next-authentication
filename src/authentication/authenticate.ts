import { AuthError } from "../errors";
import { parseBody } from "../utils";
import { VerifyFunction, Request } from "./types";

/**
 * `req.body` comes parsed using API middlewares. But in case the user turned off
 * the parsing option, we run our own parser.
 * https://nextjs.org/docs/api-routes/api-middlewares
 */
async function authenticate(
  req: Request,
  verify: VerifyFunction
): Promise<object> {
  if (!verify) {
    throw new Error("The `verify` function parameter is missing");
  }

  const { username, password } = req.body ?? (await parseBody(req));

  if (!username || !password) {
    throw new AuthError("Credentials are missing");
  }

  return await verify(username, password);
}

export { authenticate };
