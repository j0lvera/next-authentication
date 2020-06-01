import bcrypt from "bcrypt";
import { User } from "../../lib/db";

const handler = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(403).json({ message: "Invalid credentials" });
  }

  try {
    const hash = bcrypt.hashSync(password, 10);
    const user = await User.query().insert({ username, password: hash });
    console.log("user", user);

    res.status(200).json({ message: `User ${user.username} created` });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: error.message });
  }
};

export default handler;
