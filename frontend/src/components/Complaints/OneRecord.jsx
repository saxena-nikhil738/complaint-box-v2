import React, { useEffect } from "react";
import { useState } from "react";
import "./complaint.css";
import Chat from "../Chats/chat";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { toast } from "react-toastify";
import Base_URL from "../../config/Config";
import * as Cookies from "es-cookie";

const OneRecord = ({ e }) => {
  const [detail, setDetail] = useState(false);
  const [wsize, setWsize] = useState(window.innerWidth <= 664);
  const [state, setState] = useState();
  const [newNote, setNewNote] = useState();
  const [noteFlag, setNoteFlag] = useState(false);
  const [auth, setAuth] = useAuth();
  const [modify, setModify] = useState(false);
  const token = Cookies.get("token");

  const updateStates = () => {
    setDetail(!detail);
    setModify(true);
    setNewNote(e.note);
    setState(e.status);
  };

  const updateFunction = async (id) => {
    await axios
      .put(
        `${Base_URL}/update`,
        {
          id,
          state,
          newNote,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        toast.success("Record updated!", {
          position: toast.POSITION.TOP_RIGHT,
          className: "toast-message",
          autoClose: 2000,
        });
        setModify(false);
        setDetail(false);
      })
      .catch((err) => console.log(err));
  };

  const openDetailUser = () => {
    if (auth.enum === 1) {
      setDetail(!detail);
    }
  };

  return (
    <>
      <div
        className="rec-card"
        key={e._id}
        onClick={(e) => {
          // setDetail(!detail);
        }}
      >
        {!detail ? (
          // <CompressComp e={e} />
          <div className="card-content" onClick={openDetailUser}>
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
                  <span className="ele-weight">Status: </span>
                  {e.status}
                </div>
              </div>
            </div>
            {auth.enum === 0 ? (
              <button className="add-note" onClick={updateStates}>
                Modify
              </button>
            ) : (
              ""
            )}
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
              <div className="back-appid d-flex justify-content-between">
                <div className="ele-size-mb">
                  <span className="ele-weight">Application Id: </span> {e.appId}
                </div>
                <button
                  className="cancel-modify"
                  onClick={() => {
                    setDetail(false);
                  }}
                >
                  Cancel
                </button>
              </div>
              <div className="ele-size-mb">
                <span className="ele-weight">Email: </span>
                {e.email}
              </div>
              <div className="ele-size-mb">
                <span className="ele-weight">Department: </span> {e.category}
              </div>
              <div className="ele-size-mb">
                <span className="ele-weight">Date: </span> {e.dateTime}
              </div>
              <div className="ele-size-mb">
                <span className="ele-weight">Name: </span> {e.name}
              </div>
              <div className="ele-size-mb">
                <span className="ele-weight">Status: </span>
                {auth.enum === 0 && modify ? (
                  <select
                    className="option-complaint"
                    value={e._id.status}
                    onChange={(k) => setState(k.target.value)}
                  >
                    <option>{e.status}</option>
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                ) : (
                  e.status
                )}
              </div>
              <div className=" ele-size-mb">
                <span className="ele-weight">Description: </span>
                {e.description}
              </div>
              {modify ? (
                <div className="row-wise">
                  <div className=" note">
                    <span className="ele-weight">Note: </span>

                    <input
                      className="note-input"
                      type="text"
                      value={newNote}
                      onChange={(k) => {
                        setNewNote(k.target.value);
                      }}
                    />
                  </div>
                  <div className="ele-size">
                    <button
                      className="add-note-detail"
                      onClick={() => updateFunction(e._id)}
                    >
                      Update
                    </button>
                  </div>
                </div>
              ) : (
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
              )}
            </div>
            <div className="btn">
              <KeyboardArrowUpIcon
                onClick={() => {
                  setModify(false);
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
                  <span className="ele-weight">Status: </span>
                  {auth.enum === 0 && modify ? (
                    <select
                      className="option-complaint"
                      value={e._id.status}
                      onChange={(k) => setState(k.target.value)}
                    >
                      <option>{e.status}</option>
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  ) : (
                    e.status
                  )}
                </div>
              </div>
              <div className="row-wise-ml ele-size">
                <span className="ele-weight">Description: </span>
                {e.description}
              </div>

              {modify ? (
                <div className="row-wise">
                  <div className=" note">
                    <span className="ele-weight">Note: </span>

                    <input
                      className="note-input"
                      type="text"
                      value={newNote}
                      onChange={(k) => {
                        setNewNote(k.target.value);
                      }}
                    />
                  </div>
                  <div className="ele-size">
                    <button
                      className="add-note-detail"
                      onClick={() => updateFunction(e._id)}
                    >
                      Update
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  className="row-wise ele-size"
                  style={{
                    visibility: e.note === undefined ? "hidden" : "visible",
                    display: e.note === undefined ? "none" : "block",
                  }}
                >
                  <span className="ele-weight">Note: </span> {e.note}
                </div>
              )}
            </div>
            <div className="btn">
              <KeyboardArrowUpIcon
                onClick={() => {
                  setDetail(!detail);
                  setModify(false);
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
