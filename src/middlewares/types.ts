import { IncomingMessage, ServerResponse } from "http";
import { NowRequest } from "@now/node";
import { CookieSerializeOptions } from "cookie";
import { GetServerSidePropsContext } from "next";
import { NowResponse } from "@now/node/dist";

interface VerifyFunction {
  (username: string, password: string): Promise<object>;
}

interface NextAuthOptions {
  verify: VerifyFunction;
  secret: string;
  cookieOptions?: CookieSerializeOptions;
  redirectOnError?: boolean;
  redirectUrl?: string;
}

interface NextAuthRequest extends NowRequest {
  user?: string | object;
  authorized?: boolean;
}

type NextAuthResponse = NowResponse;

// Overwrite ServerResponse to allow `user` and `authorize`
interface PropsContext extends GetServerSidePropsContext {
  req: NextAuthRequest;
}

type AuthorizeArgs = NextAuthRequest[] | NextAuthResponse[] | PropsContext[];

interface AuthorizeOptions {
  secret: string;
  redirectOnError: boolean;
  redirectUrl: string;
}

export {
  VerifyFunction,
  NextAuthRequest,
  NextAuthResponse,
  NextAuthOptions,
  AuthorizeOptions,
  AuthorizeArgs,
  PropsContext,
};
