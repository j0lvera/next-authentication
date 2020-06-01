import { authorize } from "../../lib/auth";

const handler = async (req, res) => {
  console.log("user from api route", req.user);
  res.status(200).json({ user: req.user });
};

export default authorize(handler);
