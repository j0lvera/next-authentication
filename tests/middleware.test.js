const request = require("supertest");
const http = require("http");
const { nextAuth } = require("../src/middleware");
const { AuthError } = require("../src/errors");

describe("middleware nextAuth", () => {
  const verify = (username, password) => {
    return { username };
  };
  const server = http.createServer(
    nextAuth(verify)((req, res) => {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("ok");
    })
  );

  it("foo", async () => {
    const response = await request(server)
      .post("/")
      .send("username=jolvera&password=1234abc");

    expect(response.statusCode).toBe(200);
  });

  it("should return 401 if we don't send credentials", async () => {
    const response = await request(server).post("/").send("boo=far");

    expect(response.statusCode).toBe(401);
    expect(response.text).toBe("Credentials are missing");
  });
});
