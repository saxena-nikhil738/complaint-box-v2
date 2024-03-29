import { userauth } from "../models/db.js";
import { complaintData } from "../models/complaint-model.js";
import bcrypt from "bcrypt";

export const Signup = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;

  const check = await userauth.findOne({ email: email });
  if (check) {
    res.send({
      success: false,
      message: "User Already exist please login",
    });
  } else {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await userauth.create(...req.body, {
      enum: req.body.idfy,
      password: hashedPassword,
    });
    res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  }
};

export const Login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const check = await userauth.findOne({ email: email });
  if (check) {
    const match = await bcrypt.compare(password, check.password);
    if (match) {
      const token = await check.generateAuthToken();
      check.token = token;
      res.status(200).send(check);
    } else {
      res.status(400).send("Password incorrect");
    }
  } else {
    res.status(404).send("user not found");
  }
};

export const AuthToken = async (req, res) => {
  try {
    const found = await userauth.findOne({ email: req.body.email });
    if (!found) {
      res.status(404).send({ success: false, message: "Email not found" });
    } else {
      if (req.body.enu === found.enum && req.body.jwt === found.token) {
        res.status(200).send({ success: true, message: "successfull" });
      } else {
        res.status(400).send({ success: false, msg: "something wrong" });
      }
    }
  } catch (error) {
    res.status(405).send({ success: false, msg: "something wrong" });
  }
};

export const CreateComplaint = async (req, res) => {
  try {
    const info = await complaintData.create(req.body);
    return res.status(200).send("info");
  } catch (err) {
    return res.status.send(err);
  }
};

export const USerComplaint = async (req, res) => {
  if (req.query.status === "All") {
    try {
      const comps = await complaintData.find({ email: req.query.email });
      res.status(200).send(comps);
    } catch (error) {
      res.status(400).send({ message: "No record" });
    }
  } else {
    try {
      const comps = await complaintData.find({
        email: req.query.email,
        status: req.query.status,
      });
      res.status(200).send(comps);
    } catch (error) {
      res.status(400).send({ message: "No record" });
    }
  }
};

export const AdminComplaint = async (req, res) => {
  if (req.query.status === "All") {
    try {
      const comps = await complaintData.find();
      res.status(200).send(comps);
    } catch (error) {
      res.status(400).send({ message: "No record" });
    }
  } else {
    try {
      const comps = await complaintData.find({
        status: req.query.status,
      });
      res.status(200).send(comps);
    } catch (error) {
      res.status(400).send({ message: "No record" });
    }
  }
};

export const UpdateStatus = async (req, res) => {
  const result = await complaintData
    .updateOne(
      { _id: req.body.id },
      {
        $set: {
          status: req.body.state,
        },
      }
    )
    .then((result) => {
      // console.log(result);
    })
    .catch((e) => console.log(e));
};

export const AddNote = async (req, res) => {
  const result = await complaintData
    .updateOne(
      { _id: req.body.id },
      {
        $set: {
          note: req.body.value,
        },
      }
    )
    .then((result) => {})
    .catch((e) => console.log(e));
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
