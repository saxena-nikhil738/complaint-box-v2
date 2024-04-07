import React, { useEffect, useState } from "react";
import "./ResetPassword.css";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Base_URL from "../../config/Config";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "react-spinner-material";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [newpassword, setNewPassword] = useState();
  const [OTP, setOTP] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const { email, endpoint } = location.state;

  useEffect(() => {
    if (!email) {
      navigate("/forgetpassword");
    }
  });

  const ResetPassword = async () => {
    try {
      if (!OTP || !newpassword || !confirmPassword) {
        setError("All fields are required");
      } else if (newpassword !== confirmPassword) {
        setError("Password doesn't match");
      } else {
        const res = await axios.put(`${Base_URL}/resetpassword`, {
          OTP: OTP,
          email: email,
          password: confirmPassword,
        });

        if (res.data.success) {
          toast.success(res.data.message);
          navigate(`/${endpoint} ` || `/userlogin`);
        } else {
          setError("Invalid OTP");
          toast.error("Invalid OTP");
        }
      }
    } catch (error) {
      setError("Some error occured");
      console.log(error);
    }
  };

  return (
    <div>
      <div className="container-f">
        <div className="form">
          <div className="account-type">Reset Password</div>
          <label className="otp-label" htmlFor="OTP">
            Enter OTP
          </label>
          <div className="otp-inp">
            <input
              type="text"
              placeholder="Enter OTP"
              onChange={(e) => setOTP(e.target.value)}
            />
          </div>
          <label className="reset-password" htmlFor="password">
            Enter new password
          </label>
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
              placeholder="New password"
              name="password"
              id="password"
            />
            <div
              className="show"
              style={{ position: "absolute", right: "8px", top: "4px" }}
            >
              <a
                style={{ cursor: "pointer" }}
                role="button"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              >
                {!showPassword ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
              </a>
            </div>
          </div>
          <label className="reset-password" htmlFor="password">
            Confirm password
          </label>
          <div style={{ position: "relative" }}>
            <input
              type={showPassword2 ? "text" : "password"}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              placeholder="Confirm password"
              name="password"
              id="password"
            />
            <div
              className="show"
              style={{ position: "absolute", right: "8px", top: "4px" }}
            >
              <a
                style={{ cursor: "pointer" }}
                role="button"
                onClick={() => {
                  setShowPassword2(!showPassword2);
                }}
              >
                {!showPassword2 ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
              </a>
            </div>
          </div>

          {loading ? (
            <div className="spin-div">
              <Spinner className="spin" radius={25} color={"#000"} />
              Please wait...
            </div>
          ) : (
            <div
              className={
                error !== undefined ? "visible-error" : "invisible-error"
              }
            >
              {error}
            </div>
          )}
          <button onClick={ResetPassword} className="create-button">
            RESET
          </button>

          <div className="go-back">
            <Link to={"/userlogin"}>Login page? </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
