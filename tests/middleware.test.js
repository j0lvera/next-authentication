const request = require("supertest");
const http = require("http");
const { authenticate } = require("../src/middlewares");

describe("middleware authenticate", () => {
  const verify = (username, password) => {
    return { username };
  };

  const options = {
    verify,
    secret: "asecretthatsatleast16charslong",
  };

  const server = http.createServer(
    authenticate(options)((req, res) => {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("ok");
    })
  );

  it("should return 200 if we send the right credentials", async () => {
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
