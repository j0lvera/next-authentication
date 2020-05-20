import { ServerResponse } from "http";
import { CookieSerializeOptions, serialize } from "cookie";

function setCookie(
  res: ServerResponse,
  value: string,
  options?: CookieSerializeOptions
) {
  res.setHeader(
    "Set-Cookie",
    serialize("next-authentication-token", value, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 1 week,
      ...options,
    })
  );
}

export { setCookie };
