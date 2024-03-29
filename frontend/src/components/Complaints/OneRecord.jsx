import React from "react";
import { useState } from "react";
import "./complaint.css";
import Chat from "../Chats/chat";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const OneRecord = ({ e }) => {
  const [detail, setDetail] = useState(false);
  const [wsize, setWsize] = useState(window.innerWidth <= 664);
  return (
    <>
      <div
        className="rec-card"
        key={e._id}
        onClick={(e) => {
          setDetail(!detail);
        }}
      >
        {!detail ? (
          <div className="card-content">
            <div className="data">
              <div className="row-wise">
                <div className="ele-size">
                  <span className="ele-weight">Department: </span>
                  {e.category}
                </div>
                <div className="ele-size">
                  <span className="ele-weight">Date: </span>
                  {e.dateTime}
                </div>
              </div>
              <div className="row-wise">
                <div className="ele-size">
                  <span className="ele-weight">Name: </span> {e.name}
                </div>
                <div className="ele-size">
                  <span className="ele-weight">Status: </span> {e.status}
                </div>
              </div>
            </div>
            <div className="btn">
              <KeyboardArrowDownIcon
                onClick={() => {
                  setDetail(!detail);
                }}
              />
            </div>
          </div>
        ) : wsize ? (
          <div className="card-content">
            <div className="data">
              <div className="ele-size">
                {" "}
                <span className="ele-weight">Application Id: </span> {e.appId}
              </div>
              <div className="ele-size">
                <span className="ele-weight">Email: </span>
                {e.email}
              </div>
              <div className="ele-size">
                <span className="ele-weight">Department: </span> {e.category}
              </div>
              <div className="ele-size">
                <span className="ele-weight">Date: </span> {e.dateTime}
              </div>
              <div className="ele-size">
                <span className="ele-weight">Name: </span> {e.name}
              </div>
              <div className="ele-size">
                <span className="ele-weight">Status: </span> {e.status}
              </div>
              <div className=" ele-size">
                <span className="ele-weight">Description: </span>
                {e.description}
              </div>
              <div
                className="ele-size"
                style={{
                  visibility:
                    e.note === undefined || e.note === "NULL"
                      ? "hidden"
                      : "visible",
                  display:
                    e.note === undefined || e.note === "NULL"
                      ? "none"
                      : "block",
                }}
              >
                <span className="ele-weight">Note: </span> {e.note}
              </div>
            </div>
            <div className="btn">
              <KeyboardArrowUpIcon
                onClick={() => {
                  setDetail(!detail);
                }}
              />
            </div>
          </div>
        ) : (
          <div className="card-content">
            <div className="data">
              <div className="row-wise">
                <div className="ele-size">
                  {" "}
                  <span className="ele-weight">Application Id: </span> {e.appId}
                </div>
                <div className="ele-size">
                  <span className="ele-weight">Email: </span>
                  {e.email}
                </div>
              </div>
              <div className="row-wise">
                <div className="ele-size">
                  <span className="ele-weight">Department: </span> {e.category}
                </div>
                <div className="ele-size">
                  <span className="ele-weight">Date: </span> {e.dateTime}
                </div>
              </div>
              <div className="row-wise">
                <div className="ele-size">
                  <span className="ele-weight">Name: </span> {e.name}
                </div>
                <div className="ele-size">
                  <span className="ele-weight">Status: </span> {e.status}
                </div>
              </div>
              <div className="row-wise-ml ele-size">
                <span className="ele-weight">Description: </span>
                {e.description}
              </div>
              <div
                className="row-wise ele-size"
                style={{
                  visibility:
                    e.note === undefined || e.note === "NULL"
                      ? "hidden"
                      : "visible",
                  display:
                    e.note === undefined || e.note === "NULL"
                      ? "none"
                      : "block",
                }}
              >
                <span className="ele-weight">Note: </span> {e.note}
              </div>
            </div>
            <div className="btn">
              <KeyboardArrowUpIcon
                onClick={() => {
                  setDetail(!detail);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default OneRecord;
