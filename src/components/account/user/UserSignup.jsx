import axios from "axios";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import "./UserSignup.css";
import image from "../../../image/login.jpg";
import { toast } from "react-toastify";

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const token = "";
  const [error, setError] = useState();
  const navigate = useNavigate();
  const location = useLocation();

  const idfy = location.pathname === "/usersignup" ? 1 : 0;

  async function handleSubmit(e) {
    e.preventDefault();
    if (username === "" || password === "" || email === "") {
      setError("Fill required details");
    } else {
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
            navigate("/userlogin");
          }
        })
        .catch((e) => {
          setError("Something went wrong!");
          console.log(e);
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
              Hello User <br />
              please Sign up!
            </h1>
            <div className="login-form">
              <div>
                <input
                  className="inputx"
                  required
                  type="text"
                  placeholder="Username"
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
                  type="email"
                  placeholder="Email"
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
              <div
                className={
                  error === undefined ? "invisible-error" : "visible-error mb-3"
                }
              >
                {error}
              </div>
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
            <Link
              className="mb-5 mt-5"
              style={{ fontSize: "20px" }}
              to={"/userlogin"}
            >
              Have an account?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserSignup;
