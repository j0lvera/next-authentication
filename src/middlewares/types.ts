import { IncomingMessage, ServerResponse } from "http";
import { NowRequest } from "@now/node";
import { CookieSerializeOptions } from "cookie";

interface VerifyFunction {
  (username: string, password: string): Promise<object>;
}

interface NextAuthOptions {
  verify: VerifyFunction;
  secret: string;
  cookieOptions?: CookieSerializeOptions;
}

type NextAuthRequest = IncomingMessage & NowRequest;

interface NextAuthResponse extends ServerResponse {
  user?: object;
  authorized?: boolean;
}

export { VerifyFunction, NextAuthRequest, NextAuthResponse, NextAuthOptions };
