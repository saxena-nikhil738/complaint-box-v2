import express from "express";
import dotenv from "dotenv";
import {
  AddNote,
  AdminComplaint,
  AuthToken,
  ChangePassword,
  CreateComplaint,
  Login,
  Signup,
  USerComplaint,
  UpdateStatus,
} from "../handler/handler.js";

const router = express.Router();
dotenv.config();
router.use(express.json());

router.post("/signup", Signup);

router.post("/login", Login);

router.post("/tokenmatch", AuthToken);

router.post("/createcomplaint", CreateComplaint);

router.get("/usercomp", USerComplaint);

router.get("/admincomp", AdminComplaint);

router.put("/updatedstatus", UpdateStatus);

router.put("/noteadded", AddNote);

router.put("/dashboard/changePass", ChangePassword);

export default router;
