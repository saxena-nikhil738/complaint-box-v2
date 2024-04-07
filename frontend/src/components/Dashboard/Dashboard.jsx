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
import * as Cookies from "es-cookie";

export default function Dashboard() {
  const [auth, setauth] = useAuth();
  const [flag, setFlag] = useState(true);
  const [newpassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();
  const token = Cookies.get("token");

  const enableFlag = () => {
    setError("");
    setFlag(false);
  };

  const changePassword = async () => {
    if (!newpassword || !confirmPassword) {
      setError("Passwords can't be empty");
    } else if (newpassword !== confirmPassword) {
      setError("Password doesn't match");
    } else {
      try {
        const res = await axios.put(
          `${Base_URL}/dashboard/changePass`,
          {
            password: confirmPassword,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );

        if (res.data.success) {
          toast.success("Password changed!", {
            position: toast.POSITION.TOP_RIGHT,
            className: "toast-message",
            autoClose: 2000,
          });
          setFlag(true);
        }
      } catch (error) {
        setError("Failed to change password!");
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
            <h3 className="information">Information</h3>
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
                          placeholder="New password"
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="inp "
                          type="password"
                        />
                      </div>
                      <div className="pass">
                        <input
                          placeholder="Confirm password"
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="inp"
                          type="password"
                        />
                      </div>
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
