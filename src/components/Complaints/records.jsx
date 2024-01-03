import React from "react";
import { CardActionArea } from "@mui/material";
import { Card } from "react-bootstrap";
import { FormDialog } from "../Main/main";
import "./complaint.css";

const Records = ({ item, search }) => {
  return item
    .filter((complaint) => {
      if (search === "") {
        return complaint;
      } else if (complaint.name.toLowerCase().includes(search.toLowerCase())) {
        return complaint;
      }
    })
    .map((e) => {
      return (
        <>
          <div className=" mt-4 " key={e._id}>
            <Card className="class-3d card-1">
              {/* <CardActionArea> */}
              <div className="row">
                <p className="col-5 ml-3 mt-2">
                  <b>Application id:</b> {e.appId}
                </p>
                <p className="col-5 mt-2">
                  <b>Date:</b> {e.dateTime}
                </p>
              </div>

              <div className=" row">
                <div className="ml-3 mt-2 col-5">
                  <p className="">
                    <b>Title:</b> {e.category}
                  </p>
                  <p className="">
                    <b>Name:</b> {e.name}
                  </p>
                </div>
                <div className="col-5 mt-2">
                  <p className="">
                    <b>Email: </b> {e.email}
                  </p>
                  <p
                    className={
                      e.status === "Rejected"
                        ? "red"
                        : e.status === "Approved"
                        ? "green"
                        : e.status === "Processing"
                        ? "blue"
                        : "grey"
                    }
                  >
                    <b>Status:</b> {e.status}
                  </p>
                </div>
              </div>
              <p className="desc ml-3 mr-3 mt-2 ">
                <b>Description:</b> {e.description}
              </p>
              <div className="note-visible">
                <p
                  className={
                    e.note === undefined || e.note === "NULL"
                      ? "invisible"
                      : "visible ml-3 mr-3"
                  }
                >
                  <b>Note: </b>
                  {e.note}
                </p>
              </div>
            </Card>
          </div>
        </>
      );
    });
};

export default Records;
