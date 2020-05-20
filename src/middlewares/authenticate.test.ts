import { IncomingMessage, ServerResponse } from "http";
import request from "supertest";
import http from "http";
import { nextAuth } from "../index";

describe("authenticate", () => {
  describe("as middleware", () => {
    const options = {
      verify: async (username: string, password: string) => {
        return { username };
      },
      secret: "asecretthatsatleast16charslong",
    };

    const { authenticate } = nextAuth(options);

    const server = http.createServer(
      // We don't need to check the type here since we are using this to mimic
      // a Next.js API route
      // @ts-ignore
      authenticate((req: IncomingMessage, res: ServerResponse) => {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("ok");
      })
    );

    it("should return 200 if the verify function returns a user object", async () => {
      const response = await request(server)
        .post("/")
        .send("username=jolvera&password=1234abc");

      expect(response.status).toBe(200);
    });

    it("should return 401 if we send a request without credentials", async () => {
      const response = await request(server).post("/").send("boo=far");

      expect(response.status).toBe(401);
      expect(response.text).toBe(
        JSON.stringify({ message: "Missing credentials" })
      );
    });
  });

  describe("as a standlone function", () => {});
});
