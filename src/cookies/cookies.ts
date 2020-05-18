import { Request } from "../middlewares/types";
import { ServerResponse } from "http";
import { CookieSerializeOptions, serialize, parse } from "cookie";

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

function getCookie(req: Request, name = "next-authentication-token") {
  if (req.headers.cookie != null) {
    const parsedCookie = parse(req.headers.cookie);
    return parsedCookie[name];
  }

  return "";
}

export { setCookie, getCookie };
