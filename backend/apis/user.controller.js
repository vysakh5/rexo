import User from "../model/user.model.js";
import bcrypt from "bcrypt";

export const addUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
      return res.status(400).json({
        message: "user name, email, password all field is requred",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    const data = {
      userName,
      email,
      password: hashedpassword,
    };

    const newUser = new User(data);

    const savedUser = await newUser.save();

    return res.status(200).json({
      message: "add user controller",
      data: savedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error on adding user",
    });
  }
};
