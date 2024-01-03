import React from "react";
import logo from "../../image/no-record.jpg";
import "./main.css";

const NoRecord = () => {
  return (
    <div>
      <div className="no-record mb-5">
        <img className="no-record-image" src={logo} alt="React Image" />
        <p style={{ margin: "30px 0 20px 600px" }}>No Record found</p>
      </div>
    </div>
  );
};

export default NoRecord;
