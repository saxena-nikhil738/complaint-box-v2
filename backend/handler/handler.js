import { userauth } from "../models/db.js";
import { complaintData } from "../models/complaint-model.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import { generateAndSendOTP } from "./checkAuth.js";

export const UserSignup = async (req, res) => {
  try {
    const { email, password, username, idfy } = req.body;

    // Check if the user already exists
    const existingUser = await userauth.findOne({ email, isVerified: true });
    if (existingUser) {
      return res.status(208).json({
        success: false,
        message: "User already exists use another email.",
      });
    } else {
      // Generate OTP and hash password
      await userauth.findOneAndDelete({ email });
      const OTP = await generateAndSendOTP(email);
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create new user
      await userauth.create({
        email,
        password: hashedPassword,
        username,
        isVerified: false,
        OTP,
        enum: idfy,
      });

      // Send success response
      return res.status(201).json({
        success: true,
        message: "OTP sent successfully",
      });
    }
  } catch (error) {
    console.error("Error during user registration:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error1",
    });
  }
};

export const ResendOTP = async (req, res) => {
  try {
    const email = req.body.email;
    const OTP = await generateAndSendOTP(email);
    await userauth.findOneAndUpdate({ email: email }, { $set: { OTP: OTP } });
    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.error("Error during OTP resend:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const ResetPassword = async (req, res) => {
  const { email, OTP, password } = req.body;
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const check = await userauth.findOneAndUpdate(
      { email, OTP },
      { $set: { password: hashedPassword } }
    );
    if (check)
      res.status(202).send({ success: true, message: "Password changed" });
    else res.status(205).send({ success: false, message: "Invalid OTP" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ success: false, message: "Internal server error" });
  }
};

export const AdminSignup = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    // Check if the user already exists
    const existingUser = await userauth.findOne({
      email,
      isVerified: true,
    });
    if (existingUser) {
      return res.status(208).json({
        success: false,
        message: "User already exists use another email",
      });
    } else {
      // Generate OTP and hash password
      await userauth.findOneAndDelete({ email });
      const OTP = await generateAndSendOTP(email);
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create new user
      await userauth.create({
        email,
        password: hashedPassword,
        username,
        isVerified: false,
        OTP,
        enum: res.locals.type,
      });

      // Send success response
      return res.status(201).json({
        success: true,
        message: "OTP sent successfully",
      });
    }
  } catch (error) {
    console.error("Error during user registration:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error1",
    });
  }
};

export const VerifyOTP = async (req, res) => {
  try {
    const found = await userauth.findOneAndUpdate(
      { email: req.body.email, OTP: req.body.OTP },
      { $set: { isVerified: true } }
    );
    if (found) {
      res.status(200).json({ success: true, message: "User Registered" });
    } else {
      res.status(401).json({ success: false, message: "Invalid OTP" });
    }
  } catch (error) {
    console.error("Error during OTP verification:", error);
    res.status(400).json({ success: false, message: "Something went wrong" });
  }
};

export const Sign = async (req, res) => {
  const { email, password } = req.body;
  const endpoint = req.body.toogle;
  const jwtExpireTime = 86400;

  try {
    const check = await userauth.findOne({
      email: email,
      enum: endpoint,
      isVerified: true,
    });
    if (check) {
      try {
        const match = await bcrypt.compare(password, check.password);
        if (match) {
          const type = check.enum;
          const tokenT = Jwt.sign({ email, type }, process.env.SECRET_KEY, {
            algorithm: "HS256",
            expiresIn: jwtExpireTime,
          });

          const obj = {
            username: check.username,
            email: check.email,
            enum: check.enum,
          };
          res.status(200).send({ obj: obj, token: tokenT });
        } else {
          res.status(203).send("Password incorrect");
        }
      } catch (error) {
        console.error("Error comparing passwords:", error);
        res.status(500).send("Internal Server Error");
      }
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error("Error finding user:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const CreateComplaint = async (req, res) => {
  try {
    const email = res.locals.id;
    const info = await complaintData.create({ ...req.body, email: email });
    return res.status(200).json({ message: "Complaint Registered!" });
  } catch (err) {
    console.error("Error creating complaint:", err);
    return res.status(500).json({ message: "Failed to create complaint" });
  }
};

export const Complaint = async (req, res) => {
  const email = res.locals.id;
  const type = res.locals.type;
  const status = req.query.status;

  try {
    let comps;
    if (type === 1) {
      if (status === "All") {
        comps = await complaintData.find({ email });
      } else {
        comps = await complaintData.find({ email, status });
      }
    } else {
      if (status === "All") {
        comps = await complaintData.find();
      } else {
        comps = await complaintData.find({ status });
      }
    }
    if (comps.length === 0) {
      return res.status(200).send([]);
    }
    res.status(200).send(comps);
  } catch (error) {
    console.error("Error fetching complaints:", error);
    res.status(500).send({ message: "Failed to fetch complaints" });
  }
};

export const UpdateComplaint = async (req, res) => {
  const doc_id = req.body.id;
  const state = req.body.state;
  const note = req.body.newNote;
  try {
    const result = await complaintData.updateOne(
      { _id: doc_id },
      {
        $set: {
          status: state,
          note: note,
        },
      }
    );
    res.status(200).send("Status updated successfully");
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const ChangePassword = async (req, res) => {
  try {
    const password = req.body.password;
    const email = res.locals.id;
    const found = await userauth.findOneAndUpdate(
      { email: email },
      { $set: { password: password } }
    );
    res.status(200).send({ success: true, message: "Password changed" });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ success: false, message: "Failed to change password" });
  }
};
