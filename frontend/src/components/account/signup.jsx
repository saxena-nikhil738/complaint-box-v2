import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Login from "./login";
import TextField from "@mui/material/TextField";
import "./signup.css";
import image from "../../image/login.jpg";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";
import Base_URL from "../../config/Config";
import * as Cookies from "es-cookie";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const idfy = location.pathname === "/usersignup" ? 1 : 0;
  const token = Cookies.get("token");
  const endpoint = window.location.pathname.split("/").pop();

  const [auth, setAuth] = useAuth();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  const Signup = async (req, res) => {
    if (username === "" || password === "" || email === "") {
      setError("Fill requires cridentials!");
    } else {
      setLoading(true);
      if (isValidEmail(email)) {
        await axios
          .post(
            `${Base_URL}/signup`,
            {
              username,
              idfy,
              email,
              password,
            },
            {
              headers: {
                Authorization: token,
              },
            }
          )
          .then((res) => {
            setError(res.data.message);
            if (!res.data.success) {
              setError(res.data.message);
            } else {
              toast.success("User registered!", {
                position: toast.POSITION.TOP_RIGHT,
                className: "toast-message",
                autoClose: 2000,
              });
              navigate("/dashboard");
            }
          })
          .catch((e) => {
            alert("Something went wrong");
            console.log(e);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        toast.warning("Invalid email");
      }
    }
  };

  const UserSignup = async (e) => {
    e.preventDefault();

    if (username === "" || password === "" || email === "") {
      setError("Fill requires cridentials!");
    } else {
      setLoading(true);
      if (isValidEmail(email)) {
        await axios
          .post(`${Base_URL}/signup`, {
            username,
            idfy,
            email,
            password,
            token,
          })
          .then((res) => {
            setError(res.data.message);
            if (!res.data.success) {
              setError(res.data.message);
            } else {
              toast.success("User registered!", {
                position: toast.POSITION.TOP_RIGHT,
                className: "toast-message",
                autoClose: 2000,
              });
              navigate("/dashboard");
            }
          })
          .catch((e) => {
            alert("Something went wrong");
            console.log(e);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        toast.warning("Invalid email");
      }
    }
  };

  function isValidEmail(email) {
    // Regular expression pattern for basic email validation
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  }

  return (
    <div className="container-log ">
      <div className="form-body-log">
        <div className="left-log">
          <img className="log-img" src={image} alt="" />
        </div>
        <div className="v-line-log "></div>
        <div className="right-log">
          <div className="">
            <h3 className="pls-log">
              Hello Admin <br />
              please Sign up!
            </h3>
            <div className="login-form">
              <div className="name-enter">
                <label className="enter-det">Name</label>
                <input
                  className="inputx "
                  required
                  placeholder="Username"
                  type="text"
                  label="Username"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  id="username"
                />
              </div>
              <div className="email-enter">
                <label className="enter-det">Email</label>
                <input
                  className=" inputx"
                  required
                  placeholder="Email"
                  type="email"
                  label="Enter email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  id="email"
                />
                <br />
              </div>
              <div className="password-enter">
                <label className="enter-det">Password</label>
                <input
                  required
                  className="border-1 inputx"
                  type="password"
                  placeholder="Password"
                  id="password"
                  label="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {loading ? (
                <h5 className="wait">Please wait...</h5>
              ) : (
                <div
                  className={
                    error !== undefined ? "visible-error" : "invisible-error"
                  }
                >
                  {error}
                </div>
              )}
              <div className="btn-log-div">
                {endpoint === "signup" ? (
                  <button type="button" onClick={Signup} className="log-btn">
                    Sign up
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={UserSignup}
                    className="log-btn"
                  >
                    Sign up
                  </button>
                )}
              </div>
              <div className="switch-login">
                <Link to={"/dashboard"}>Back</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Signup;
