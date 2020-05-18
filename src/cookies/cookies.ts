import * as cookie from "cookie";
import { Request } from "../authentication/types";
import { ServerResponse } from "http";

function setCookie(
  res: ServerResponse,
  value: string,
  options = { name: "token" }
) {
  const { name } = options;

  res.setHeader(
    "Set-Cookie",
    cookie.serialize(name, value, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 1 week,
      ...options,
    })
  );
}

function getCookie(req: Request, name = "token") {
  if (req.headers.cookie != null) {
    const parsedCookie = cookie.parse(req.headers.cookie);
    return parsedCookie[name];
  }

  return "";
}

export { setCookie, getCookie };
