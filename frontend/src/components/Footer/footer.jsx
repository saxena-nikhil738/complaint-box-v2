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
      <div className="wrapper-1">
        <div className="copy-right">© 2023 Copyright:cmpbox221.com</div>
        <div className="links">
          <a href="" className="link-foot">
            Help center
          </a>
          <a href="" className="link-foot">
            GitHub
          </a>
          <a href="" className="link-foot">
            Twitter
          </a>
          <a href="" className="link-foot">
            Privacy & Policy
          </a>
          <a href="" className="link-foot">
            nikhilsaxena738@gmail.com
          </a>
          <a href="" className="link-foot">
            Terms & Conditions
          </a>
        </div>
        <div className="country">
          <img src="/india.png" alt="image" className="india" />
          <div className="copy-right">India</div>
        </div>
      </div>
    </>
  );
};

export default Footer;
