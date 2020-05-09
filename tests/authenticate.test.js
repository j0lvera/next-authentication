const request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");
import { authenticate } from "../src/index";
import { AuthError } from "../src/errors";

describe("authenticate", () => {
  const expectedUsername = "jolvera";

  const verify = (username, password) => {
    return { username };
  };

  function generateApp(verify) {
    const app = express();
    app.use(bodyParser.urlencoded());

    app.post("/", async (req, res) => {
      try {
        const username = await authenticate(req, verify);
        res.status(200).json(username);
      } catch (error) {
        res.status(error.status).json({ message: error.message });
      }
    });

    return app;
  }

  // Use express to mimic API routes middelwares
  // https://nextjs.org/docs/api-routes/api-middlewares

  it("should return a user object if verify passes", async () => {
    const app = generateApp(verify);
    const response = await request(app)
      .post("/")
      .send(`username=${expectedUsername}&password=1234abc`)
      .set("Accept", "application/json");

    expect(response.statusCode).toEqual(200);
    expect(response.text).toBe(JSON.stringify({ username: expectedUsername }));
  });

  it("should return 401 if credentials are missing", async () => {
    const app = generateApp(verify);
    const response = await request(app)
      .post("/")
      .send("foo=bar")
      .set("Accept", "application/json");

    expect(response.statusCode).toEqual(401);
    expect(response.text).toEqual(
      JSON.stringify({ message: "Credentials are missing" })
    );
  });

  it("should throw AuthError if credentials are missing", async () => {
    const req = { body: "" };
    const auth = async () => await authenticate(req, verify);
    await expect(auth).rejects.toThrow(
      new AuthError("Credentials are missing")
    );
  });

  it("should throw an exception if the verify function is not passed as parameter", async () => {
    const auth = async () => await authenticate({});
    await expect(auth).rejects.toThrow(
      Error("The `verify` function parameter is missing")
    );
  });
});
