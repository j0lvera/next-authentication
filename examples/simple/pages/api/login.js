import { authenticate } from "../../lib/auth";

const handler = async (req, res) => {
  res.status(200).json({ message: "ok" });
};

export default authenticate(handler);
