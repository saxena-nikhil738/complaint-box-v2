import react, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./header.css";
import { useAuth } from "../../context/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import * as Cookies from "es-cookie";
import Dialog from "@mui/material/Dialog";

const Header = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [showList, setShowList] = useState(window.innerWidth < 664);
  const [hambed, setHambed] = useState(false);
  const [logout, setLogout] = useState(false);
  const [auth, setAuth] = useAuth();
  const [dash, setDash] = useState();
  const token = Cookies.get("token");

  const handleClose = () => {
    setOpen(false);
  };

  const eraseData = () => {
    setAuth({
      ...auth,
      username: "",
      enum: "",
      email: "",
    });

    Cookies.remove("token");
    Cookies.remove("data");
    localStorage.removeItem("auth");
    toast.error("Logged out!", {
      position: toast.POSITION.TOP_RIGHT,
      className: "toast-message",
      autoClose: 2000,
    });
    setOpen(false);
    navigate("/");
  };

  const toggle = () => {
    setOpen(true);
    setHambed(false);
  };
  useEffect(() => {}, [open]);

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <div className="log-out">
          <div className="logout-title">Are you sure ?</div>
          <div className="btn-logout">
            <button className="sure-log" onClick={eraseData}>
              Logout
            </button>
            <button className="no-log" onClick={() => setOpen(false)}>
              Cancel
            </button>
          </div>
        </div>
      </Dialog>
      <nav className="main-nav">
        {/* Logo */}
        <div className="hamb-cont">
          <div className="logo">
            <Link to={"/"} className="logo-link-1">
              ComplaintBox
            </Link>
          </div>
          {/* Menu links */}
          <div
            className="hamburger"
            onClick={() => {
              setHambed(!hambed);
            }}
          >
            {hambed ? <CloseIcon /> : <MenuIcon />}
          </div>
        </div>
        <div
          className={
            showList ? (hambed ? "mobile-link" : "hide-nav") : "menu-link-1"
          }
        >
          <ul>
            <li>
              <Link to="/" className="link-1" onClick={() => setHambed(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="link-1"
                onClick={() => setHambed(false)}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/main/allcomplaint"
                className="link-1"
                onClick={() => setHambed(false)}
              >
                Complaints
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className="link-1"
                onClick={() => setHambed(false)}
              >
                Dashboard
              </Link>
            </li>

            <li>
              {token ? (
                <Link
                  id="logout"
                  className="link-1"
                  variant="primary"
                  onClick={toggle}
                >
                  Logout
                </Link>
              ) : (
                <Link
                  to="/userlogin"
                  id="logout"
                  className="link-1"
                  variant="primary"
                  onClick={() => setHambed(false)}
                >
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};
export default Header;
