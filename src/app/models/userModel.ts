import { timeStamp } from "console";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Please Enter User Name"],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Please Enter Password"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  createdAt: { type: Date, default: Date.now },
});

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);

export default UserModel;
