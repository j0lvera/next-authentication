import bcrypt from "bcrypt";
import { nextAuth, AuthError } from "next-authentication";
import { User } from "./db";

const options = {
  verify: async (username, password) => {
    const user = await User.query().findOne({ username });
    console.log("user", user);

    if (!user) {
      throw new AuthError("User does not exist", 404);
    }

    const valid = bcrypt.compareSync(password, user.password);

    if (!valid) {
      throw new AuthError("Invalid credentials", 403);
    }

    return { username: user.username };
  },
  secret: process.env.SECRET || "asecrethatsatleast16charasters",
  redirectOnError: false,
  redirectUrl: "/",
};

export const { authenticate, authorize, logout } = nextAuth(options);
