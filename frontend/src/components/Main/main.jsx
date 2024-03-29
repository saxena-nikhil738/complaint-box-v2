import React from "react";
import { useState } from "react";
import "./main.css";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { NavComplaints } from "../Complaints/NavComplaints";

export function FormDialog() {
  return (
    <React.Fragment>
      <NavComplaints />
    </React.Fragment>
  );
}
