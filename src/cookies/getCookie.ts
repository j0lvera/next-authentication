import { NextAuthRequest } from "../middlewares/types";
import { parse } from "cookie";

function getCookie(req: NextAuthRequest, name = "next-authentication-token") {
  if (req.headers.cookie != null) {
    const parsedCookie = parse(req.headers.cookie);
    return parsedCookie[name];
  }

  return "";
}

export { getCookie };
