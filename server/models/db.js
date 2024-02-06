import mongoose from "mongoose";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

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
  token: {
    type: String,
  },
});

newSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.token = token;
    await this.save();
    return token;
  } catch (error) {
    console.log(error);
  }
};

const collection = mongoose.model("collection", newSchema);
const userauth = mongoose.model("userauth", newSchema);

export { collection, userauth };
