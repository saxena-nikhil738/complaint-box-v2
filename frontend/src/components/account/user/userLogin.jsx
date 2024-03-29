import axios from "axios";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./UserLogin.css";
import { useAuth } from "../../../context/auth";
import image from "../../../image/login.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Base_URL from "../../../config/Config";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [auth, setAuth] = useAuth();
  const [error, setError] = useState();
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
          if (res.data.enum === 1) {
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
        setError("Something went wrong");
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <div className="container-user">
      <div className="form-body-user">
        <div className="left-user">
          <img className="log-img" src={image} alt="" />
        </div>
        <div className="v-line-user "></div>
        <div className="right-user">
          <div className="content-user">
            <h3 className="pls-user">
              Welcome back <br />
              please Login!
            </h3>
            <div className="form-login">
              <div className="email-user">
                <label className="enter-det">Email</label>
                <input
                  className=" inputx"
                  required
                  type="email"
                  placeholder="Email"
                  label="Enter email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  id="email"
                />
              </div>
              <div className="password-user">
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
                    error !== undefined
                      ? "visible-error mb-3"
                      : "invisible-error"
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
            </div>
            <div className="switch-links">
              <Link className="switch-create" to={"/usersignup"}>
                Create account?
              </Link>
              <Link className="switch-login" to={"/login"}>
                Admin login?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserLogin;
