import React from "react";
import image from "../../image/404.jpg";
import { Link } from "react-router-dom";
import "./PageNotFound.css";
const PageNotFound = () => {
  return (
    <div className="np-container">
      <div className="np-data">
        <div className="np-img-div">
          <img className="np-img" src={image} alt="Not found" />
        </div>
        <div className="np-content">
          <div className="np-content-data">
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <Link to="/">Go to Homepage</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
