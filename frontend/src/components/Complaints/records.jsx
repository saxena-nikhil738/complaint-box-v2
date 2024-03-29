import React, { useState } from "react";
import { CardActionArea } from "@mui/material";
import { Card } from "react-bootstrap";
import { FormDialog } from "../Main/main";
import "./complaint.css";
import Chat from "../Chats/chat";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import OneRecord from "./OneRecord";

const Records = ({ item, search }) => {
  const [detail, setDetail] = useState(false);
  return item
    .filter((complaint) => {
      if (search === "") {
        return complaint;
      } else if (complaint.name.toLowerCase().includes(search.toLowerCase())) {
        return complaint;
      }
    })
    .map((e) => {
      return (
        <>
          <OneRecord e={e} />
        </>
      );
    });
};

export default Records;
