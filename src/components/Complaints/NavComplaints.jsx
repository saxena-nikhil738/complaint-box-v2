import { CardActionArea } from "@mui/material";
import React from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./complaint.css";
import { useAuth } from "../../context/auth";

export const NavComplaints = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  return (
    <>
      <div className="container">
        <div className="row ml-5">
          <div className="col-6 row ">
            <Card className="all-complaints class-3d col-5 mb-5 mr-5 mt-5">
              <CardActionArea
                style={{ outline: "none" }}
                className="p-3 comp"
                name="getall"
                value="getall"
                onClick={() => navigate("/main/allcomplaints")}
              >
                <h1>All complaints</h1>
              </CardActionArea>
            </Card>
            <Card className="solved-complaints class-3d col-5 mb-5 mt-5">
              <CardActionArea
                style={{ outline: "none" }}
                className="p-3 comp"
                name="getall"
                value="getall"
                onClick={() => navigate("/main/solvedcomplaints")}
              >
                <h1>Solved </h1>
              </CardActionArea>
            </Card>
          </div>
          <div className="col-6 row">
            {auth.enum === 1 ? (
              <Card className="pending-complaints class-3d col-5 mb-5 mr-5 mt-5">
                <CardActionArea
                  style={{ outline: "none" }}
                  className="p-3 comp"
                  name="getall"
                  value="getall"
                  onClick={() => navigate("/main/processingcomplaints")}
                >
                  <h1>Processing</h1>
                </CardActionArea>
              </Card>
            ) : (
              <Card className="pending-complaints class-3d col-5 mb-5 mr-5 mt-5">
                <CardActionArea
                  style={{ outline: "none" }}
                  className="p-3 comp"
                  name="getall"
                  value="getall"
                  onClick={() => navigate("/main/pendingcomplaints")}
                >
                  <h1>Pending</h1>
                </CardActionArea>
              </Card>
            )}

            <Card className="rejected-complaints class-3d col-5 mb-5  mt-5">
              <CardActionArea
                style={{ outline: "none" }}
                className="p-3"
                name="getall"
                value="getall"
                onClick={() => navigate("/main/rejectedcomplaints")}
              >
                <h1>Rejected</h1>
              </CardActionArea>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};
