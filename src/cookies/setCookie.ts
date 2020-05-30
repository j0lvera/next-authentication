import { ServerResponse } from "http";
import { CookieSerializeOptions, serialize } from "cookie";

const setCookie = (
  res: ServerResponse,
  value: string,
  options?: CookieSerializeOptions
): void => {
  res.setHeader(
    "Set-Cookie",
    serialize("next-authentication-token", value, options)
  );
};

export { setCookie };
