import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const newSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  enum: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: String,
  },
  OTP: {
    type: String,
  },
});

const userauth = mongoose.model("userauth", newSchema);

export { userauth };
