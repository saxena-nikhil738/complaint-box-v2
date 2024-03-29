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
import Base_URL from "../../config/Config";

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
        const res = await axios.put(`${Base_URL}/dashboard/changePass`, {
          email,
          old,
          newPass,
        });

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
      <div className="container-dash ">
        <div className="form-body-1">
          <div className="left">
            <img className="user-img" src={image} alt="" />
            <div className="user-type">
              {auth.enum === 1 ? "User" : "Admin"}
            </div>
            <div className="new-acc">
              {auth.enum === 0 ? (
                <Button onClick={() => navigate("/signup")} varient="contained">
                  Create new admin
                </Button>
              ) : (
                ""
              )}
            </div>
          </div>

          <div className={!flag ? "v-line-2" : "v-line-1"}></div>
          <div className="right">
            <h2 className="">Information</h2>
            <hr />
            <div className="wrapper-dash">
              <div className="user">
                <p className="title">Username</p>
                <p className="value">{auth.username}</p>
              </div>
              <div className="email">
                <p className="title">Email</p>
                <p className="value">{auth.email}</p>
              </div>
              <div className="">
                {flag ? (
                  <Button onClick={enableFlag} varient="contained">
                    Change Password
                  </Button>
                ) : (
                  <>
                    <Button
                      className=""
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
                            : "visible-error"
                        }
                      >
                        {error}
                      </div>
                      <div className="request">
                        <Button
                          onClick={changePassword}
                          className=""
                          varient="contained"
                          color="success"
                        >
                          Change
                        </Button>
                        <Button onClick={(e) => setFlag(true)} className="">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
