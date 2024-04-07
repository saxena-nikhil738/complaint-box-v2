import axios from "axios";
import { createRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./EnterEmail.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Base_URL from "../../config/Config";
import Spinner from "react-spinner-material";

const EnterEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  console.log(location);
  const endpoint = location.state;

  const SendOTP = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${Base_URL}/resendOTP`, {
        email: email,
      });

      if (res.data.success) {
        navigate(`/resetpassword`, { state: { email, endpoint } });
        toast.success(res.data.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.log(error);
      setError("Failed to send OTP");
      toast.error("Failed to send OTP", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-f">
      <div className="form">
        <div className="account-type">Forget password</div>
        <div className="input-field">
          <label className="email" htmlFor="email">
            Enter Email
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
        <button onClick={SendOTP} className="create-button">
          Send OTP
        </button>

        <div className="switch-account">
          <div className="signup-login">
            <div className="exist">
              <Link className="login-link" to="/userlogin">
                Login page
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EnterEmail;
