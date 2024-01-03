import React from "react";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import "./footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="wrapper-1 ml-2 mr-2">
        <div className="row">
          <div className="col-1"></div>
          <div className="col-2 row cmp-text justify-content-start ">
            <div className="col-9">
              <h2 className="cmp-text">
                <b>Complaint Box</b>
              </h2>
            </div>
          </div>

          <div className="col-2">
            <h4 className="">
              <b style={{ fontSize: "20px" }}>ABOUT</b>
            </h4>
            <p className="sml-1">Purpose</p>
            <p className="sml-1">Features</p>
          </div>
          <div className="col-2">
            <h4 className="">
              <b style={{ fontSize: "20px" }}>FOLLOW US</b>
            </h4>
            <p className="sml-1">GitHub</p>
            <p className="sml-1">Discord</p>
          </div>
          <div className="col-2">
            <h4 className="">
              <b style={{ fontSize: "20px" }}>LEGAL </b>
            </h4>
            <p className="sml-1">Privacy Policy</p>
            <p className="sml-1">Terms & Conditions</p>
          </div>
          <div className="col-2">
            <h4>
              <b style={{ fontSize: "20px" }}>CONTACT</b>
            </h4>
            <p className="sml-1">nikhilsaxena738@gmail.com</p>
            <p className="sml-1">contact: +91 9129968392</p>
          </div>
          <div className="col-1"></div>
        </div>
        {/* <div className="row">
          <div className="col-1"></div>
          <div className="col-10">
            <hr />
          </div>
          <div className="col-1"></div>
        </div> */}
        <hr style={{ marginLeft: "40px", marginRight: "40px" }} />
        <div className="icons row">
          <div className="col-1"></div>
          <div className="col-3">
            <p style={{ fontSize: "20px" }}>© 2023 Copyright:cmpbox221.com </p>
          </div>
          <div className="col-8 row">
            <div className="col-4"></div>
            <div className="col-3"></div>
            <div className="col-4">
              <Link
                to="http://www.facebook.com/nikhil.saxena.9803/"
                target="_blank"
              >
                <FaFacebook
                  style={{ color: "rgb(28, 40, 51 )", marginLeft: "100px" }}
                  size={28}
                  className="mr-4"
                />
              </Link>
              <Link
                to="http://www.instagram.com/nikhil_saxena._/"
                target="_blank"
              >
                <FaInstagram
                  style={{ color: "rgb(28, 40, 51 )" }}
                  size={28}
                  className="mr-4"
                />
              </Link>
              {/* <Link to="/">
                <FaTwitter
                  style={{ color: "rgb(28, 40, 51 )" }}
                  size={28}
                  className="mr-4"
                />
              </Link> */}
              <Link to="http://github.com/saxena-nikhil738">
                <FaGithub
                  style={{ color: "rgb(28, 40, 51 )" }}
                  size={28}
                  className="mr-4"
                />
              </Link>
              <Link to="http://www.linkedin.com/in/saxena-nikhil738/">
                <FaLinkedin
                  style={{ color: "rgb(28, 40, 51 )" }}
                  size={28}
                  className="mr-4"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
