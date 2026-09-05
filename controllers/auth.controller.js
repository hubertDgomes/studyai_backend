import userSchema from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Long } from "mongodb";

const singupController = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All of the fields are requred!" });
  }

  try {
    const checkUser = await userSchema.findOne({ email });
    if (checkUser) {
      return res
        .status(409)
        .json({ message: "User has already been registered. Try to log in." });
    }

    const hash = await bcrypt.hash(password, 10);

    const newUser = userSchema({
      name,
      email,
      password: hash,
    });

    newUser.save();
    const token = jwt.sign(
      { id: newUser._id, username: newUser.name },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" },
    );
    res.cookie("token", token);
    return res.status(200).json({ message: "User created!" });
  } catch (err) {
    throw err;
  }
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All of the fields are requred!" });
  }
  try {
    const checkUser = await userSchema.findOne({ email });
    if (!checkUser) {
      return res
        .status(400)
        .json({ message: "New user detected, Try to signup first!" });
    }
    const checkPass = await bcrypt.compare(password, checkUser.password);
    if (!checkPass) {
      return res.status(400).json({ message: "Invalid Credential" });
    }

    const token = jwt.sign(
      { id: checkUser._id, username: checkUser.name },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" },
    );
    res.cookie("token", token);
    return res.status(200).json({ message: "Login Successfully!" });
  } catch (err) {
    throw err;
  }
};

const logoutController = async (req, res) => {
  res.clearCookie("token")
  return res.status(200).json({message : "Logout Successfully!"})
}

const getMe = async (req , res) => {
    const checkUser = await userSchema.findById(req.user.id)
    return res.status(200).json(checkUser)
}

export default { singupController, loginController, logoutController, getMe };
