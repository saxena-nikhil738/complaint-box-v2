import axios from "axios";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/auth";
import "./login.css";
import image from "../../../image/login.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Base_URL from "../../../config/Config";

const Login = () => {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [auth, setAuth] = useAuth();
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();

    if (email == "" || password === "") {
      setError("Fill required cridentials");
    } else {
      setLoading(true);
      try {
        const res = await axios.post(`${Base_URL}/login`, {
          email,
          password,
        });
        if (
          res.data === "Password incorrect" ||
          res.data === "user not found"
        ) {
          setError(res.data);
        } else {
          if (res.data.enum === 0) {
            if (res.data !== null) {
              toast.success("Logged in successfully !", {
                position: toast.POSITION.TOP_RIGHT,
                className: "toast-message",
                autoClose: 2000,
              });
              setAuth({
                ...auth,
                check: true,
                username: res.data.username,
                enum: res.data.enum,
                email: res.data.email,
                token: res.data.token,
              });
              localStorage.setItem(
                "auth",
                JSON.stringify({
                  username: res.data.username,
                  email: res.data.email,
                  enum: res.data.enum,
                  token: res.data.token,
                })
              );

              navigate(location?.state?.prevUrl || "/");
            }
          } else {
            setError("Invalid username password!");
          }
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
                  // style={{ fontSize: "60px", height: "50px" }}
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
                <button type="button" onClick={submit} className="log-btn">
                  Login
                </button>
              </div>
              <div className="switch-links">
                <Link className="switch-login" to={"/userlogin"}>
                  User login?
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
