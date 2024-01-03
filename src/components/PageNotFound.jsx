import React from "react";
import image from "../image/404.jpg";
import { Link } from "react-router-dom";
const PageNotFound = () => {
  return (
    <div>
      <div style={{ margin: "200px 200px" }} className="row">
        <div style={{}} className="col-7">
          <img
            style={{ marginLeft: "70px", width: "500px", height: "auto" }}
            src={image}
            alt="Not found"
          />
        </div>
        <div className="col-5">
          <div style={{ margin: "50px 50px" }} className="cont mt-5">
            <h1 style={{ fontSize: "100px" }}>404</h1>
            <br />
            <h2 className="mb-4" style={{ color: "black" }}>
              Page Not Found
            </h2>
            <Link to="/">Go to Homepage</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
