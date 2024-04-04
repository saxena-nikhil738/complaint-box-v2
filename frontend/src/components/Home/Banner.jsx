import React from "react";
import "./banner.css";
import { Checkmark } from "react-checkmark";
import { Button } from "react-bootstrap";
import client from "../../image/client.jpg";

const Banner = () => {
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
            <button className="km-btn-left" disabled>
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
                <button className="km-btn">Know more</button>
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
