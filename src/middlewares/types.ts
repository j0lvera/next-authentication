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
  externalServer?: boolean;
  cookieName?: string;
  cookieUserOptions?: CookieSerializeOptions;
  redirectOnError?: boolean;
  redirectUrl?: string;
}

interface AuthorizeOptions {
  secret: string;
  externalServer: boolean;
  cookieName?: string;
  redirectOnError: boolean;
  redirectUrl: string;
}

interface AuthenticateOptions {
  verify: VerifyFunction;
  secret: string;
  cookieName: string;
  cookieUserOptions: CookieSerializeOptions;
}

interface LogoutOptions {
  cookieName: string;
  redirectOnError: boolean;
  redirectUrl: string;
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

export {
  VerifyFunction,
  NextAuthRequest,
  NextAuthResponse,
  NextAuthOptions,
  AuthorizeOptions,
  AuthenticateOptions,
  LogoutOptions,
  AuthorizeArgs,
  PropsContext,
};
