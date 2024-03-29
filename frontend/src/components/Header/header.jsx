import react, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaLinkedin, FaInstagramSquare } from "react-icons/fa";
import "./header.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { DropdownButton, Dropdown, Button } from "react-bootstrap";
import { useAuth } from "../../context/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Header = () => {
  const navigate = useNavigate();
  const [showList, setShowList] = useState(window.innerWidth < 664);
  const [hambed, setHambed] = useState(false);
  const [auth, setAuth] = useAuth();
  const [dash, setDash] = useState();

  const toggle = () => {
    setAuth({
      ...auth,
      username: "",
      enum: "",
      email: "",
      token: "",
    });
    toast.error("Logged out!", {
      position: toast.POSITION.TOP_RIGHT,
      className: "toast-message",
      autoClose: 2000,
    });
    localStorage.removeItem("auth");
    // navigate("/");
  };

  return (
    <>
      <nav className="main-nav">
        {/* Logo */}
        <div className="hamb-cont">
          <div className="logo">
            <a onClick={() => navigate("/")} className="link-1">
              ComplaintBox
            </a>
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
              <a href="/" className="link-1">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="link-1">
                About
              </a>
            </li>
            <li>
              <a href="/main/allcomplaint" className="link-1">
                Complaints
              </a>
            </li>
            <li>
              <a href="/dashboard" className="link-1">
                Dashboard
              </a>
            </li>

            <li>
              {auth?.token ? (
                <a
                  href="/logout"
                  id="logout"
                  className="link-1"
                  variant="primary"
                  onClick={toggle}
                >
                  Logout
                </a>
              ) : (
                <a
                  href="/userlogin"
                  id="logout"
                  className="link-1"
                  variant="primary"
                >
                  Login
                </a>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};
export default Header;
