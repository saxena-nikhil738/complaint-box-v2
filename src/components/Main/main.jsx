import React from "react";
import { useState } from "react";
import "./main.css";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { NavComplaints } from "../Complaints/NavComplaints";

export function FormDialog() {
  return (
    <React.Fragment>
      <div className="mt-5">
        <br></br>
        <NavComplaints />
      </div>
    </React.Fragment>
  );
}
