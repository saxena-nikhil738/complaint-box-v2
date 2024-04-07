import React from "react";
import "./banner.css";
import client from "../../image/client.jpg";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="parent-banner">
        <div className="left-child">
          <div className="welcome-left">
            Welcome to complaint box
            <div className="features-left">
              <ul>
                <li>Transparency about complaints</li>
                <li>Track your complaint</li>
                <li>Easy to get response</li>
                <li>Secure to use responsibly</li>
              </ul>
            </div>
            <button className="km-btn-left" onClick={() => navigate("/about")}>
              Know more
            </button>
          </div>
        </div>
        <div className="right-child">
          <div className="right-content-banner">
            <div className="banner-header">
              <div className="left-part">Complaint System</div>
              <div className="right-part">
                <ul>
                  <li>Home</li>
                  <li>About</li>
                  <li>Complaints</li>
                  <li>Dashboard</li>
                </ul>
              </div>
            </div>
            <hr />
            <div className="wel-img">
              <div className="welcome">
                Welcome to complaint box
                <div className="features">
                  <ul>
                    <li>Transparency about complaints</li>
                    <li>Track your complaint</li>
                    <li>Easy to get response</li>
                    <li>Secure to use responsibly</li>
                  </ul>
                </div>
                <button className="km-btn" onClick={() => navigate("/about")}>
                  Know more
                </button>
              </div>

              <img src={client} alt="image" className="welcome-img" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
