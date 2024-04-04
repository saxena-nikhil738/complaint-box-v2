import { userauth } from "../models/db.js";
import { complaintData } from "../models/complaint-model.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

export const UserSignup = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    // Check if the user already exists
    const existingUser = await userauth.findOne({ email });
    if (existingUser) {
      return res.status(208).json({
        success: false,
        message: "User already exists. Please login.",
      });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    await userauth.create({
      email,
      password: hashedPassword,
      username,
      enum: req.body.idfy, // Assuming idfy is provided in the request body
    });

    // Send success response
    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const Signup = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    // Check if the user already exists
    const existingUser = await userauth.findOne({ email });
    if (existingUser) {
      return res.status(208).json({
        success: false,
        message: "User already exists. Please login.",
      });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    await userauth.create({
      email,
      password: hashedPassword,
      username,
      enum: res.locals.type, // Assuming idfy is provided in the request body
    });

    // Send success response
    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const Sign = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const endpoint = req.body.endpoint;
  const jwtExpireTime = 86400;

  try {
    const check = await userauth.findOne({ email: email, enum: endpoint });
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
  const oldPass = req.body.old;
  const newPassword = req.body.newPass;
  const email = req.body.email;
  const found = await userauth.findOne({ email: email });
  if (found) {
    try {
      const match = await bcrypt.compare(oldPass, found.password);

      if (match) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
        await userauth
          .updateOne(
            { email: req.body.email },
            {
              $set: {
                password: hashedPassword,
              },
            }
          )
          .then((result) => {
            res.status(200).send({
              success: true,
              message: "Password changed!",
            });
          })
          .catch((e) => {
            console.log(e);
            res
              .status(400)
              .send({ success: false, message: "Something went wrong!" });
          });
      } else {
        res.status(404).send({
          success: true,
          message: "Password not matched!",
        });
      }
    } catch (error) {
      res
        .status(404)
        .send({ success: false, message: "Something went wrong!" });
    }
  } else {
    res.status(404).send({ success: false, message: "Email not matched!" });
  }
};
