import React from "react";
import "./banner.css";
import { Checkmark } from "react-checkmark";
import { Button } from "react-bootstrap";
import client from "../../image/client.jpg";

const Banner = () => {
  return (
    <>
      <div className="">
        <div className="row banner">
          <div className="col-5 left">
            <h1 style={{ fontSize: 70, fontStyle: "bold" }}>Complaint box</h1>
            <h3 style={{ fontSize: 40 }}>Let's know about this</h3>
            <br />
            <div className="parent-feature">
              <h3 className="feature">
                {/* <Checkmark size="20px " color="orange" />  */}✅
                Transparency about complaints.
              </h3>
              <h3 className="mt-3 feature">
                {/* <Checkmark className="p-0" size="20px " color="orange" /> */}
                ✅ Track your complaint status.
              </h3>
              <h3 className="mt-3 feature">
                {/* <Checkmark size="20px " width="10px" color="orange" />  */}
                ✅Get easy response.
              </h3>
            </div>
            <Button className="button" variant="contained">
              Know more
            </Button>
          </div>
          <div className="ml-5 col-6 right">
            <div className="r-tag">
              <div className="head">
                <ul className="row">
                  <li className="col-1"></li>
                  <li className="col-2">Complaint Box</li>
                  <li className="col-1"></li>
                  <li className="col-1">Home</li>
                  <li className="col-1">About</li>
                  <li className="col-1">Complaints</li>
                  <li className="col-2">Dashboard</li>
                  <li className="col-1"></li>
                  <button
                    disabled
                    style={{
                      height: "20px",
                      color: "white",
                      backgroundColor: "rgb(100, 149, 237 )",
                      border: "none",
                      borderRadius: "4px",
                    }}
                    className="col-1"
                  >
                    Login
                  </button>
                </ul>
              </div>
              <hr />
              <div className="row">
                <div
                  className="col-6 left mt-5"
                  style={{ color: "rgb(100, 149, 237 )" }}
                >
                  <h1 style={{ fontSize: 30, fontStyle: "bold" }}>
                    Complaint box
                  </h1>
                  <h3 style={{ fontSize: 20 }}>Let's know about this</h3>

                  <div className="parent-feature mt-5">
                    <h3 className="feature">
                      {/* <Checkmark size="12px " color="orange" />  */}✅
                      Transparency about complaints.
                    </h3>
                    <h3 className="mt-3 feature">
                      {/* <Checkmark className="p-0" size="12px " color="orange" />{" "} */}
                      ✅Track your complaint status.
                    </h3>
                    <h3 className="mt-3 feature">
                      {/* <Checkmark size="12px " width="10px" color="orange" /> */}
                      ✅ Get easy response.
                    </h3>
                  </div>
                  <Button
                    className=""
                    style={{
                      border: "none",
                      outline: "none",
                      color: "rgb(100, 149, 237 )",
                      width: "70px",
                      height: "30px",
                      borderRadius: "16px",
                    }}
                    variant="contained"
                  >
                    Know more
                  </Button>
                </div>
                <div className="right col-5 pl-5">
                  <img
                    className="ml-5"
                    style={{ width: "150px" }}
                    src={client}
                    alt="client_image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
