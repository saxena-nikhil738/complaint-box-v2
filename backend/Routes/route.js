import express from "express";
import dotenv from "dotenv";
import {
  ChangePassword,
  CreateComplaint,
  Sign,
  Signup,
  Complaint,
  UpdateComplaint,
  UserSignup,
} from "../handler/handler.js";
import { checkAuth } from "../handler/checkAuth.js";

const router = express.Router();
dotenv.config();
router.use(express.json());
router.get("/", (req, res) => {
  res.send("Server is running");
});

router.post("/signup", checkAuth, Signup);
router.post("/usersignup", UserSignup);

router.post("/login", Sign);

router.post("/createcomplaint", checkAuth, CreateComplaint);

router.get("/complaint", checkAuth, Complaint);

router.put("/update", checkAuth, UpdateComplaint);

router.put("/dashboard/changePass", checkAuth, ChangePassword);

export default router;
