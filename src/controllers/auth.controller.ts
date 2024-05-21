import { Request, Response } from "express";
import User from "../models/auth.model";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { decodeUser } from "../utils/decode";
dotenv.config();

export async function createUser(req: Request, res: Response) {
  try {
    const { username, email, password } = req.body;
    console.log(username, email, password);
    if (!username || !email || !password) {
      return res.status(422).json({ message: "This feilds are Required" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const addUser = new User({
      username,
      email,
      password: hashPassword,
    });
    const user = await addUser.save();
    const token = Jwt.sign({ id: user._id }, process.env.JWT_SECRET as string)
    res.cookie('todo_token', token, { httpOnly: false, maxAge: 24 * 60 * 60 * 1000, });
    return res.status(200).json({ message: "Signup successful", token:token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = Jwt.sign({ id: user._id }, process.env.JWT_SECRET as string)
    res.cookie('todo_token', token, { httpOnly: false, secure:true, maxAge: 24 * 60 * 60 * 1000, });
    return res.status(200).json({ message: "Login successful", token:token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
}

export async function getUser(req: Request, res:Response) {
  try {
    const userId = await decodeUser(req.cookies.todo_token)
    const user = await User.findById(userId?._id);
    return res.status(200).json({ message: "User fetched", user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const userId = await decodeUser(req.cookies.todo_token)
    const { username, email } = req.body;
    if (!username || !email) {
      return res.status(422).json({ message: "This feilds are Required" });
    }
    const user = await User.findByIdAndUpdate(userId?._id, { username, email }, { new: true });
    return res.status(200).json({ message: "User updated", user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
}

export async function updatePassword(req: Request, res: Response) {
  try {
    const userId = await decodeUser(req.cookies.todo_token)
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(userId?._id);
    const isMatch = await bcrypt.compare(oldPassword, user?.password as string);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const hashPassword = await bcrypt.hash(newPassword, 10);
    const updatedUser = await User.findByIdAndUpdate(userId?._id, { password: hashPassword }, { new: true });
    return res.status(200).json({ message: "Password updated", updatedUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
}