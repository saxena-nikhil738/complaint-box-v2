import axios from "axios";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import "./login.css";
import image from "../../image/login.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Base_URL from "../../config/Config";
import * as Cookies from "es-cookie";
import Spinner from "react-spinner-material";

const Login = () => {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [auth, setAuth] = useAuth();
  const [loading, setLoading] = useState(false);

  let endpoint;
  if (window.location.pathname.split("/").pop() === "userlogin") endpoint = 1;
  if (window.location.pathname.split("/").pop() === "login") endpoint = 0;

  async function submit(e) {
    e.preventDefault();

    if (email == "" || password === "") {
      setError("Fill required cridentials");
    } else {
      setLoading(true);
      try {
        const res = await axios.post(`${Base_URL}/login`, {
          endpoint,
          email,
          password,
        });
        if (
          res.data === "Password incorrect" ||
          res.data === "user not found"
        ) {
          setError(res.data);
        } else {
          const data = res.data.obj;

          Cookies.set("token", res.data.token);
          Cookies.set("data", JSON.stringify(data));
          setAuth(data);
          if (res.data !== null) {
            toast.success("Logged in successfully !", {
              position: toast.POSITION.TOP_RIGHT,
              className: "toast-message",
              autoClose: 2000,
            });
            navigate(location?.state?.prevUrl || "/");
          }
          // } else {
          setError("Invalid username password!");
          // }
        }
      } catch (error) {
        setError("Somthing went wrong!");
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <div className="container-log ">
      <div className="form-body-log">
        <div className="left-log">
          <img className="log-img" src={image} alt="" />
        </div>
        <div className="v-line-log "></div>
        <div className="right-log">
          <div className="content-log">
            <h3 className="pls-log">
              Welcome back <br />
              please Login!
            </h3>
            <div className="form-login">
              <div className="enter-det">
                <label className="email-enter">Email</label>
                <input
                  className=" inputx"
                  required
                  placeholder="Enter email"
                  type="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  id="email"
                />
              </div>
              <div className="enter-det">
                <label className="password-enter">Password</label>
                <input
                  required
                  className="border-1 inputx"
                  type="password"
                  placeholder="Password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
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
              <div className="btn-log-div">
                <button type="button" onClick={submit} className="log-btn">
                  Login
                </button>
              </div>
              <div className="switch-links">
                {!endpoint ? (
                  <Link className="switch-login" to={"/userlogin"}>
                    User login?
                  </Link>
                ) : (
                  <Link className="switch-login" to={"/login"}>
                    Admin login?
                  </Link>
                )}
                <Link className="switch-login" to={"/usersignup"}>
                  Create Account?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
