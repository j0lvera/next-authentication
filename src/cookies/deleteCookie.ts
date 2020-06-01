import { serialize } from "cookie";
import { ServerResponse } from "http";

function deleteCookie(res: ServerResponse): void {
  res.setHeader(
    "Set-Cookie",
    serialize("next-authentication-token", "", { maxAge: -1, path: "/" })
  );
}

export { deleteCookie };
