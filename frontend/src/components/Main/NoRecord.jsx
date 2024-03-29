import React from "react";
import logo from "../../image/no-record.jpg";
import "./No-rec.css";

const NoRecord = () => {
  return (
    <div>
      <div className="no-record mb-5">
        <img className="no-record-image" src={logo} alt="React Image" />
        <p className="nrf">No Record found</p>
      </div>
    </div>
  );
};

export default NoRecord;
