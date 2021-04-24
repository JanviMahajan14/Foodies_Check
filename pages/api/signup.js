import initDB from "../../utils/initDB";
import User from "../../models/user";
import bcrypt from "bcrypt"
import cart from "../../models/cart"

initDB();

export default async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).send({ error: "Please fill all the fields" })
        }
    const user = await User.findOne({ email })
    if (user) {
        return res.status(400).send({ error: "User already exists" });
        }
    const hashedPassword = await bcrypt.hash(password, 8);
    const newUser = await new User({
        name,
        email,
        password:hashedPassword
        }).save()
        res.send(newUser)
        await new Cart({user:newuser. id)).save()
    }
    catch (error) {
      res.statusCode = 400;
      res.send({ error: error.message });
    }
}