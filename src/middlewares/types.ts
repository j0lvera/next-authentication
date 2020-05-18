import { IncomingMessage } from "http";
import { NowRequest } from "@now/node";

interface VerifyFunction {
  (username: string, password: string): Promise<object>;
}

interface NextAuthOptions {
  verify: VerifyFunction;
  secret: string;
  expiresIn?: string;
}

type Request = IncomingMessage & NowRequest;

export { VerifyFunction, Request, NextAuthOptions };
