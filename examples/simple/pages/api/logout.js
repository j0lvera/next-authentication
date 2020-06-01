import { logout } from "../../lib/auth";

export default logout((req, res) =>
  res.status(200).json({ message: "User logged out" })
);
