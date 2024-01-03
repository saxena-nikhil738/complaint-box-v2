import react, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaLinkedin, FaInstagramSquare } from "react-icons/fa";
import "./header.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { DropdownButton, Dropdown, NavLink, Button } from "react-bootstrap";
import { useAuth } from "../../context/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  const navigate = useNavigate();
  const [showList, setShowList] = useState(false);
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
    navigate("/");
  };

  return (
    <>
      <nav className="main-nav">
        {/* Logo */}
        <div className="logo">
          <button onClick={() => navigate("/")} className="link">
            ComplaintBox
          </button>
        </div>
        {/* Menu links */}
        <div
          className={
            showList ? "menu-link mobile-menu-link" : "menu-link active"
          }
        >
          <ul>
            <li>
              <NavLink href="/" className="link">
                <p>Home</p>
              </NavLink>
            </li>
            <li>
              <NavLink href="/about" className="link">
                <p>About</p>
              </NavLink>
            </li>
            <li>
              <NavLink href="/main" className="link">
                <p>Complaints</p>
              </NavLink>
            </li>
            <li>
              <NavLink href="/dashboard" className="link">
                <p>Dashboard</p>
              </NavLink>
            </li>

            <li>
              {auth?.token ? (
                // <button >Logout</button>
                <Button
                  style={{ height: "36px", width: "60px", borderRadius: "8px" }}
                  id="logout"
                  variant="primary"
                  onClick={toggle}
                >
                  Logout
                </Button>
              ) : (
                <Dropdown>
                  <Dropdown.Toggle
                    style={{
                      height: "36px",
                      width: "60px",
                      borderRadius: "8px",
                    }}
                    variant="primary"
                    className="dropdown-1"
                    id="dropdown-basic"
                  >
                    Login
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="/userlogin">User</Dropdown.Item>
                    <Dropdown.Item href="/login">Admin</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </li>
          </ul>
        </div>
        {/* Social media links */}
        {/* <div className="social-media">
          <ul className="social-media-desktop">
            <li>
              <a href="" className="link">
                <FaInstagramSquare className="instagram" />
              </a>
            </li>
            <li>
              <a href="#">
                <FaLinkedin />
              </a>
            </li>
          </ul>
          <div className="hamburger-menu">
            <a href="#" onClick={() => setShowList(!showList)}>
              <GiHamburgerMenu />
            </a>
          </div>
        </div> */}
      </nav>
      {/* <div className="main-section">
        <p>Welcome to</p>
        <h1>Complaint Box</h1>
      </div> */}
    </>
  );
};
export default Header;
