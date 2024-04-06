import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./complaint.css";
import { useAuth } from "../../context/auth";
import Chat from "../Chats/chat";
import ChatSidebar from "../Chats/ChatSidebar";
import NewComplaint from "./newComplaint";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
// import { useRouter } from "next/router";

export const NavComplaints = () => {
  // const router = useRouter();
  const navigate = useNavigate();
  const [type, setType] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {}, [type]);

  return (
    <>
      <div className=" left">
        <NewComplaint />
        <div
          className="drop"
          onClick={(e) => {
            setType(!type);
          }}
        >
          Select complaint type
          {type ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </div>
        <div className={!type ? "hide" : "navigator"}>
          <Link to="/main/allcomplaint" className="link-comp">
            <div
              className="card-nav"
              onClick={(e) => {
                setType(false);
              }}
            >
              All complaints
            </div>
          </Link>
          <Link to="/main/approved" className="link-comp">
            <div
              className="card-nav"
              onClick={(e) => {
                setType(false);
              }}
            >
              Solved complaints
            </div>
          </Link>

          <Link to="/main/processing" className="link-comp">
            <div
              className="card-nav"
              onClick={(e) => {
                setType(false);
              }}
            >
              Processing complaints
            </div>
          </Link>
          <Link to="/main/pending" className="link-comp">
            <div
              className="card-nav"
              onClick={(e) => {
                setType(false);
              }}
            >
              Pending complaints
            </div>
          </Link>

          <Link to="/main/rejected" className="link-comp">
            <div
              className="card-nav"
              onClick={(e) => {
                setType(false);
              }}
            >
              Rejected complaints
            </div>
          </Link>
        </div>
        {/* {auth.enum === 1 ? (
          <a href="/main/chat">Sidebar</a>
        ) : (
          <a href="/main/reply">Reply</a>
        )} */}
      </div>
    </>
  );
};
