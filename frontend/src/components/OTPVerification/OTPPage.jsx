import { useScrollTrigger } from "@mui/material";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "./OTPPage.css";
import BASE_URL from "../../config/Config.js";

const OTPPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showOTP, setShowOTP] = useState(false);
  const [resent, setResent] = useState(true);
  console.log(location);
  let email, logintype;
  if (location.state) {
    email = location.state.email;
    logintype = location.state.logintype;
  }
  const [htmlLoaded, setHtmlLoaded] = useState(false);
  const [checkEmail, setCheckEmail] = useState("");
  const [OTP, setOTP] = useState("");
  const inputRefs = useRef([]);

  const resendOTP = async () => {
    await axios
      .post(`${BASE_URL}/resendOTP`, { email })
      .then((res) => {
        countdown();
        toast.success(res.data.message);
      })
      .catch((error) => {
        toast("Failed to send OTP");
        console.log(error);
      });
  };

  useEffect(() => {
    console.log(email, logintype);
    if (!email || !logintype) {
      navigate("/usersignup");
    } else {
      const disableFalse = document.getElementById("resendBtn");
      if (disableFalse) disableFalse.disabled = true;
      const displayNone = document.getElementById("tracker");
      if (displayNone) displayNone.style.display = "block";
      const indexBeforeAt = email.indexOf("@");
      setCheckEmail(
        email.substring(0, indexBeforeAt - 3) +
          "***" +
          email.substring(indexBeforeAt)
      );
      setHtmlLoaded(true); // HTML loaded
    }
  }, [resent]);

  useEffect(() => {
    if (htmlLoaded) {
      countdown();
    }
  }, [htmlLoaded]);

  const verify = async () => {
    console.log(OTP);
    console.log(email);
    try {
      const res = await axios.post(`${BASE_URL}/verifyOTP`, {
        email,
        OTP,
      });
      console.log(res.data);
      if (res.data.success === true) {
        navigate(`/${logintype}`);
        toast.success("User registered");
      } else {
        toast.error("invalid OTP");
      }
    } catch (error) {
      toast.error("invalid OTP");
      console.log(error);
    }
  };

  // Function to decrement the timer every second
  function countdown() {
    let timer = 60;
    const timerElement = document.getElementById("timer");

    const interval = setInterval(() => {
      timer--;
      if (timerElement) timerElement.innerHTML = timer;

      if (timer === 0) {
        // document.getElementById("timer").innerHTML = 60;
        clearInterval(interval); // Stop the countdown when timer reaches 0
        const displayNone = document.getElementById("tracker");
        if (displayNone) displayNone.style.display = "none";
        const disableFalse = document.getElementById("resendBtn");
        if (disableFalse) disableFalse.disabled = false;
      }
    }, 1000);
    // return () => clearInterval(interval);
  }

  const refresh = () => {
    document.getElementById("resendBtn").disabled = true;
    console.log("object");
    resendOTP();
    setResent(!resent);
  };

  const handleChange = (index, value) => {
    const newOTP = OTP.slice(0, index) + value + OTP.slice(index + 1);
    setOTP(newOTP);

    // Move focus to the next input field if the current input field is filled
    if (value !== "" && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  return (
    <div>
      <div className="container-f">
        <div className="form-otp">
          <h3 className="verify-title">Verify Email</h3>
          <p>Enter 6 digit code you have received on {checkEmail}</p>
          <label className="title" htmlFor="OTP">
            Enter OTP
          </label>

          <div className="boxes">
            {[...Array(6)].map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={OTP[index] || ""}
                onChange={(e) => handleChange(index, e.target.value)}
                ref={(input) => {
                  inputRefs.current[index] = input;
                }}
              />
            ))}
          </div>

          <button onClick={verify} className="create-button">
            VERIFY
          </button>
          <div className="resend-div">
            <button
              id="resendBtn"
              onClick={refresh}
              style={{ cursor: "pointer" }}
              className="resendbtn"
              //   disabled
            >
              Resend OTP
            </button>
            <span id="tracker">
              <span id="timer" style={{ marginLeft: "10px" }}>
                60
              </span>{" "}
              seconds remaining
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPPage;
