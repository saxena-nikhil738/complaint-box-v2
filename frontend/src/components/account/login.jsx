import axios from "axios";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import "./login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Base_URL from "../../config/Config";
import * as Cookies from "es-cookie";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Spinner from "react-spinner-material";

const Login = ({ endpoint }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const [error, setError] = useState();
  const [auth, setAuth] = useAuth();
  const [loading, setLoading] = useState(false);

  let toogle;
  if (endpoint === "userlogin") toogle = 1;
  if (endpoint === "login") toogle = 0;

  console.log(toogle);

  async function submit(e) {
    e.preventDefault();

    if (email == "" || password === "") {
      setError("Fill required cridentials");
    } else {
      setLoading(true);
      try {
        const res = await axios.post(`${Base_URL}/login`, {
          toogle,
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
    <div className="container-f">
      <div className="form">
        <div className="account-type">Please login</div>
        <div className="input-field">
          <label className="email" htmlFor="email">
            Email
          </label>
          <input
            type="text"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            name="email"
            id="email"
          />
        </div>
        <label className="password" htmlFor="password">
          Password
        </label>
        <div style={{ position: "relative" }}>
          {!showPassword ? (
            <input
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              name="password"
              id="password"
            />
          ) : (
            <input
              type="text"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              name="password"
              id="visiblepassword"
            />
          )}
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
        <div className="forget-password">
          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/forgetpassword", { state: endpoint });
            }}
          >
            {" "}
            Forgot password?
          </div>
        </div>
        <button onClick={submit} className="create-button">
          LOGIN
        </button>

        <div className="switch-account">
          <div className="signup-login">
            <div className="exist">
              <Link className="login-link" to="/usersignup">
                Create Account?
              </Link>
            </div>
          </div>
          {toogle ? (
            <Link className="admin-login" to="/login">
              Admin login
            </Link>
          ) : (
            <Link className="admin-login" to="/userlogin">
              User login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
export default Login;
