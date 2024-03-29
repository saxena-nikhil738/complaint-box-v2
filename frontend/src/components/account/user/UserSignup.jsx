import axios from "axios";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import "./UserSignup.css";
import image from "../../../image/login.jpg";
import { toast } from "react-toastify";
import Base_URL from "../../../config/Config";

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const token = "";
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const idfy = location.pathname === "/usersignup" ? 1 : 0;

  async function handleSubmit(e) {
    e.preventDefault();
    if (username === "" || password === "" || email === "") {
      setError("Fill required details");
    } else {
      if (isValidEmail(email)) {
        setLoading(true);
        await axios
          .post(`${Base_URL}/signu`, {
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
              navigate("/userlogin");
            }
          })
          .catch((e) => {
            setError("Something went wrong!");
            console.log(e);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        toast.warning("Invalid email");
      }
    }
  }
  function isValidEmail(email) {
    // Regular expression pattern for basic email validation
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  }

  return (
    <div className="container-log ">
      <div className="form-body-log ">
        <div className="left-log">
          <img className="log-img" src={image} alt="" />
        </div>
        <div className="v-line "></div>
        <div className="right-log">
          <div className="">
            <h3 className="pls-log">
              Hello User <br />
              please Sign up!
            </h3>
            <div className="form-login">
              <div className="name-enter">
                <label className="enter-det">Username</label>
                <input
                  className="inputx"
                  required
                  type="text"
                  placeholder="Username"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  id="username"
                />
              </div>
              <div className="email-enter">
                <label className="enter-det">Email</label>
                <input
                  className="inputx"
                  required
                  type="text"
                  placeholder="Username"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  id="username"
                />
              </div>
              <div className="password-enter">
                <label className="enter-det">Password</label>
                <input
                  required
                  className="border-1 inputx "
                  type="password"
                  placeholder="Password"
                  id="password"
                  label="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {!isValidEmail(email) ? (
                ""
              ) : loading ? (
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
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="log-btn"
                >
                  Sign up
                </button>
              </div>
            </div>
            <div className="switch-links">
              <Link className="switch-login" to={"/userlogin"}>
                Have an account?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserSignup;
