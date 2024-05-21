import mongoose from "mongoose";
import { IUser } from "../utils/types/user";

const userSchema = new mongoose.Schema<IUser>(
  {
    username: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: function (value: string) {
          // Use a regex for basic email validaXtion
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(value);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", userSchema);