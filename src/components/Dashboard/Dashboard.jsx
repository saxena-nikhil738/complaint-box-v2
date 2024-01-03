import React, { useState } from "react";

import "./dash-container.css";
import { useAuth } from "../../context/auth";
// import { Button } from "react-bootstrap";
import axios from "axios";
import Button from "@mui/material/Button";
// import { Button } from "rsuite";
import image from "../../image/user.png";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Dashboard() {
  const [auth, setauth] = useAuth();
  const [flag, setFlag] = useState(true);
  const [old, setOld] = useState("");
  const [newPass, setNewPass] = useState("");
  const email = auth.email;
  const [error, setError] = useState();
  const navigate = useNavigate();

  const enableFlag = () => {
    setFlag(false);
  };

  const changePassword = async () => {
    if (old === "" || newPass === "") {
      setError("Fill passwords");
    } else {
      try {
        const res = await axios.put(
          "https://complaint-box-backend-v2.onrender.com/dashboard/changePass",
          {
            email,
            old,
            newPass,
          }
        );

        if (res.data.message === "Password changed!") {
          setError("Password changed!");
          toast.success("Password changed!", {
            position: toast.POSITION.TOP_RIGHT,
            className: "toast-message",
            autoClose: 2000,
          });
          setFlag(true);
        } else {
          setError("Something went wrong!");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className="container ">
        <div className="form-body row">
          <div className="left col-5">
            <img
              style={{ width: "300px", height: "auto" }}
              src={image}
              alt=""
            />
            <div
              style={{ fontSize: "30px", color: "black" }}
              className="user-type mt-5"
            >
              {auth.enum === 1 ? "User" : "Admin"}
            </div>
            <div className="new-acc">
              {auth.enum === 0 ? (
                <Button
                  style={{
                    outline: "none",
                    fontSize: "12px",
                    cursor: "pointer",
                    border: "none",
                    borderRadius: "12px",
                  }}
                  onClick={() => navigate("/signup")}
                  varient="contained"
                >
                  Create new admin
                </Button>
              ) : (
                ""
              )}
            </div>
          </div>

          <div className={!flag ? "v-line-2" : "v-line-1"}></div>
          <div className="right col-6">
            <h2 className="">Information</h2>
            <hr />
            <div className="wrapper">
              <div className="user">
                <p className="title mt-5">Username</p>
                <p className="value">{auth.username}</p>
              </div>
              <div className="email">
                <p className="title">Email</p>
                <p className="value">{auth.email}</p>
              </div>
              <div className="mb-5">
                {/* <div className="btn-2 mb-4"> */}
                {flag ? (
                  <Button
                    style={{
                      outline: "none",
                      fontSize: "12px",
                      cursor: "pointer",
                      border: "none",
                      borderRadius: "12px",
                    }}
                    onClick={enableFlag}
                    varient="contained"
                  >
                    Change Password
                  </Button>
                ) : (
                  <>
                    <Button
                      className="mb-4"
                      style={{
                        outline: "none",
                        fontSize: "12px",
                        cursor: "pointer",
                        border: "none",
                        borderRadius: "12px",
                      }}
                      disabled={true}
                      onClick={changePassword}
                      varient="contained"
                    >
                      Change Password
                    </Button>
                    <br />
                    <div className="enter-pass ">
                      <div className="pass">
                        <input
                          placeholder="Old password"
                          onChange={(e) => setOld(e.target.value)}
                          className="inp "
                          type="password"
                        />
                      </div>
                      <br />
                      <div className="pass">
                        <input
                          placeholder="New password"
                          onChange={(e) => setNewPass(e.target.value)}
                          className="inp"
                          type="password"
                        />
                      </div>
                      <br />
                      <div
                        className={
                          error === undefined || error === "Password changed!"
                            ? "invisible-error"
                            : "visible-error mb-3"
                        }
                      >
                        {error}
                      </div>
                      <div className="request">
                        <Button
                          style={{ outline: "none", fontSize: "12px" }}
                          onClick={changePassword}
                          className="mt-4"
                          varient="contained"
                          color="success"
                        >
                          Change
                        </Button>
                        <Button
                          style={{ outline: "none", fontSize: "12px" }}
                          onClick={(e) => setFlag(true)}
                          className="mt-4"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
