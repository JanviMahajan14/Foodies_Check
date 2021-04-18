import initDB from "../../utils/initDB";
import User from "../../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

initDB();

export default async (req, res) => {
  try {
    const { email, password } = req.body;
    if ( !email || !password) {
      return res.status(400).send({ error: "Please fill all the fields" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ error: "No such user exists" });
    }
      
    const doMatch = await bcrypt.compare(password, user.password);
    if (!doMatch) {
        return res.status(400).send({ error: "Incorrect email or password" });
    }
    
    const token = jwt.sign({ _id: user._id }, "pizza1234");
    const { role } = user
    res.send({ token, user : { role } })
  }
  catch (error) {
    res.statusCode = 400;
    res.send({ error: error.message });
  }
};
