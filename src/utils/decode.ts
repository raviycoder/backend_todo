import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import User from "../models/auth.model";
export async function decodeUser(token: string) {
  const decode:any = Jwt.verify(token, process.env.JWT_SECRET as string);
  const user = User.findById(decode.id);
  return user
}
