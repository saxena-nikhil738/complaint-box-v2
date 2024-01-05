import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Login from "./login";
import TextField from "@mui/material/TextField";
import "./signup.css";
import image from "../../../image/login.jpg";
import { useAuth } from "../../../context/auth";
import { toast } from "react-toastify";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const token = "";
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const idfy = location.pathname === "/usersignup" ? 1 : 0;

  const [auth, setAuth] = useAuth();

  useEffect(() => {
    if (auth.enum === "") {
      navigate("/login");
    }
  }, []);
  async function handleSubmit(e) {
    e.preventDefault();

    if (username === "" || password === "" || email === "") {
      setError("Fill requires cridentials!");
    } else {
      setLoading(true);
      await axios
        .post("https://complaint-box-backend-v2.onrender.com/signup", {
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
    }
  }

  return (
    <div className="container ">
      <div className="form-body row">
        <div className="left col-6">
          <img style={{ width: "400px", height: "auto" }} src={image} alt="" />
        </div>
        <div className="v-line "></div>
        <div className="right col-5">
          <div className="">
            <h1 className="mb-5" style={{ fontSize: "35px" }}>
              Hello Admin <br />
              please Sign up!
            </h1>
            <div className="login-form">
              <div>
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
              <div>
                <input
                  style={{ fontSize: "60px" }}
                  className=" inputx mt-4"
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
              <div>
                <input
                  required
                  className="border-1 inputx mt-4 mb-4"
                  type="password"
                  placeholder="Password"
                  id="password"
                  label="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {loading ? (
                <h5 className="mb-3">Please wait...</h5>
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
              <div>
                <button
                  type="button"
                  onClick={handleSubmit}
                  style={{
                    width: "120px",
                    height: "40px",
                    fontSize: "20px",
                    borderRadius: "24px",
                  }}
                  className="btn btn-primary btn-lg btn-block"
                >
                  Sign up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Signup;
