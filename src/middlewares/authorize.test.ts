import { IncomingMessage, ServerResponse } from "http";
import request from "supertest";
import http from "http";
import { nextAuth } from "../index";
import { encrypt } from "../utils";
import { serialize } from "cookie";

describe("authorize", () => {
  describe("as middleware", () => {
    const options = {
      verify: async (username: string, password: string): Promise<object> => {
        console.log("password", password);
        return { username };
      },
      secret: "asecretthatsatleast16charslong",
    };

    const { authorize } = nextAuth(options);

    const generateCookie = (secret: string): string => {
      return serialize(
        "next-authentication-token",
        encrypt({ username: "jolvera" }, secret),
        {
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 7, // 1 week,
        }
      );
    };

    const server = http.createServer(
      // We don't need to check the type here since we are using this to mimic
      // a Next.js API route
      // eslint-disable-next-line
      // @ts-ignore
      authorize((req: IncomingMessage, res: ServerResponse) => {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "ok" }));
      })
    );

    it("should return 200 if we send a request with a valid cookie", async () => {
      const cookie = generateCookie(options.secret);
      const response = await request(server)
        .get("/")
        .set("Cookie", cookie)
        .set("Accept", "application/json");

      expect(response.status).toBe(200);
      expect(response.text).toEqual(JSON.stringify({ message: "ok" }));
    });

    it("should return 403 if we send a request with cookie but invalid data", async () => {
      const invalidCookie = generateCookie("notthesecretweexpect");
      const response = await request(server)
        .get("/")
        .set("Cookie", invalidCookie);

      expect(response.status).toBe(403);
      expect(response.text).toEqual(
        JSON.stringify({ message: "Invalid credentials" })
      );
    });

    it("should return 403 if we send a request without cookies", async () => {
      const response = await request(server).get("/");

      expect(response.status).toBe(403);
      expect(response.text).toEqual(
        JSON.stringify({ message: "Invalid credentials" })
      );
    });
  });
});
