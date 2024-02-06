import express from "express";
import { collection, userauth } from "../models/db.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { complaintData } from "../models/complaint-model.js";

const router = express.Router();
dotenv.config();
router.use(express.json());

router.post("/signup", async (req, res) => {
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

    const user = await new userauth({
      username,
      enum: req.body.idfy,
      email,
      password: hashedPassword,
      token: req.body.token,
    }).save();
    res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  }
});

router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const check = await userauth.findOne({ email: email });
  if (check) {
    const match = await bcrypt.compare(password, check.password);
    if (match) {
      const token = await check.generateAuthToken();
      check.token = token;
      res.send(check);
    } else {
      res.json("Password incorrect");
    }
  } else {
    res.json("user not found");
  }
});

router.post("/tokenmatch", async (req, res) => {
  try {
    const found = await userauth.findOne({ email: req.body.email });
    if (!found) {
      res.status(404).json({ success: false, message: "Email not found" });
    } else {
      if (req.body.enu === found.enum && req.body.jwt === found.token) {
        res.status(200).json({ success: true, message: "successfull" });
      } else {
        res.status(400).json({ success: false, msg: "something wrong" });
      }
    }
  } catch (error) {
    res.status(405).json({ success: false, msg: "something wrong" });
  }
});

router.post("/createcomplaint", async (req, res) => {
  try {
    const info = await complaintData.create(req.body);
    return res.json("info");
  } catch (e) {
    return res.json(e);
  }
});

router.get("/allcomplaint", async (req, res) => {
  try {
    const info = await complaintData.find();
    // console.log(info);
    res.json(info);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
  //console.log(res.cookies);
});
router.get("/pending", async (req, res) => {
  // console.log("hii");
  try {
    const info = await complaintData.find({ status: "pending" });
    // console.log(info);
    res.json(info);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
  //console.log(res.cookies);
});
router.get("/processing", async (req, res) => {
  // console.log("hii");
  try {
    const info = await complaintData.find({ status: "Processing" });
    // console.log(info);
    res.json(info);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
  //console.log(res.cookies);
});
router.get(`/rejected`, async (req, res) => {
  // console.log("hii");
  try {
    const info = await complaintData.find({ status: "Rejected" });
    // console.log(info);
    res.status(200).json(info);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
  //console.log(res.cookies);
});

router.get("/solved", async (req, res) => {
  try {
    const info = await complaintData.find({ status: "Approved" });

    res.json(info);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/updatedstatus", async (req, res) => {
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
});

router.put("/noteadded", async (req, res) => {
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
});

router.put("/dashboard/changePass", async (req, res) => {
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
            res.json({
              success: true,
              message: "Password changed!",
            });
          })
          .catch((e) => {
            console.log(e);
            res.json({ success: false, message: "Something went wrong!" });
          });
      } else {
        res.json({
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
});

export default router;
