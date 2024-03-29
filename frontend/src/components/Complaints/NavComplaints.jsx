import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./complaint.css";
import { useAuth } from "../../context/auth";
import Chat from "../Chats/chat";
import ChatSidebar from "../Chats/ChatSidebar";
import NewComplaint from "./newComplaint";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export const NavComplaints = () => {
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
          <a href="/main/allcomplaint" className="link-comp">
            <div
              className="card-nav"
              onClick={(e) => {
                setType(!type);
              }}
            >
              All complaints
            </div>
          </a>
          <a href="/main/approved" className="link-comp">
            <div
              className="card-nav"
              onClick={(e) => {
                setType(!type);
              }}
            >
              Solved complaints
            </div>
          </a>

          {auth.enum === 1 ? (
            <a href="/main/processing" className="link-comp">
              <div
                className="card-nav"
                onClick={(e) => {
                  setType(!type);
                }}
              >
                Processing complaints
              </div>
            </a>
          ) : (
            <a href="/main/pending" className="link-comp">
              <div
                className="card-nav"
                onClick={(e) => {
                  setType(!type);
                }}
              >
                Pending complaints
              </div>
            </a>
          )}
          <a href="/main/rejected" className="link-comp">
            <div
              className="card-nav"
              onClick={(e) => {
                setType(!type);
              }}
            >
              Rejected complaints
            </div>
          </a>
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
