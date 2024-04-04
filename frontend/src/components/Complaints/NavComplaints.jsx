import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./complaint.css";
import { useAuth } from "../../context/auth";
import Chat from "../Chats/chat";
import ChatSidebar from "../Chats/ChatSidebar";
import NewComplaint from "./newComplaint";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import { useRouter } from "next/router";

export const NavComplaints = () => {
  // const router = useRouter();
  const navigate = useNavigate();
  const [type, setType] = useState(window.innerWidth > 664);
  const [auth, setAuth] = useAuth();
  return (
    <>
      <div className=" mt-4 left">
        <div className="mb-4 comp">
          <NewComplaint />
        </div>
        <div
          className="drop"
          onClick={(e) => {
            setType(!type);
          }}
        >
          select your complaint type
          <KeyboardArrowDownIcon />
        </div>
        <div className={!type ? "hide" : "navigator"}>
          <Link to="/main/allcomplaint" className="link-comp">
            <div className="card-nav" onClick={(e) => {}}>
              All complaints
            </div>
          </Link>
          <Link to="/main/approved" className="link-comp">
            <div className="card-nav" onClick={(e) => {}}>
              Solved complaints
            </div>
          </Link>

          <Link to="/main/processing" className="link-comp">
            <div className="card-nav" onClick={(e) => {}}>
              Processing complaints
            </div>
          </Link>
          <Link to="/main/pending" className="link-comp">
            <div className="card-nav" onClick={(e) => {}}>
              Pending complaints
            </div>
          </Link>

          <Link to="/main/rejected" className="link-comp">
            <div className="card-nav" onClick={(e) => {}}>
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
