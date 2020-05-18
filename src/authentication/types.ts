import { IncomingMessage } from "http";
import { NowRequest } from "@now/node";

interface VerifyFunction {
  (username: string, password: string): Promise<object>;
}

type Request = IncomingMessage & NowRequest;

export { VerifyFunction, Request };
