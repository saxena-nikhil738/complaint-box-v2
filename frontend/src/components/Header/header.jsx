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
import * as Cookies from "es-cookie";

const Header = () => {
  const navigate = useNavigate();
  const [showList, setShowList] = useState(window.innerWidth < 664);
  const [hambed, setHambed] = useState(false);
  const [auth, setAuth] = useAuth();
  const [dash, setDash] = useState();
  const token = Cookies.get("token");

  const toggle = () => {
    setAuth({
      ...auth,
      username: "",
      enum: "",
      email: "",
    });
    toast.error("Logged out!", {
      position: toast.POSITION.TOP_RIGHT,
      className: "toast-message",
      autoClose: 2000,
    });
    Cookies.remove("token");
    Cookies.remove("data");
    localStorage.removeItem("auth");
    // navigate("/");
  };

  return (
    <>
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
              <Link to="/" className="link-1">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="link-1">
                About
              </Link>
            </li>
            <li>
              <Link to="/main/allcomplaint" className="link-1">
                Complaints
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="link-1">
                Dashboard
              </Link>
            </li>

            <li>
              {token ? (
                <Link
                  to="/logout"
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
