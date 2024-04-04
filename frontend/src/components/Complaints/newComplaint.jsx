import * as React from "react";
import { button } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "./NewComplaint.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Base_URL from "../../config/Config";
import * as Cookies from "es-cookie";

export default function NewComplaint() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("Pending");
  const [name, setName] = useState();
  const [auth, setAuth] = useAuth();
  const [email, setemail] = useState(auth.email);
  const [category, setCategory] = useState();
  const [description, setDescription] = useState();
  const [error, setError] = useState();
  const token = Cookies.get("token");
  const note = undefined;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setemail(auth.email);
  });

  async function submit(e) {
    e.preventDefault();
    if (category === undefined) {
      setError("Select category");
    } else if (name === undefined || description === undefined) {
      setError("Fill the required filled");
    } else {
      const d = new Date();
      const appId =
        d.getFullYear() +
        "" +
        ("0" + (d.getMonth() + 1)).slice(-2) +
        "" +
        ("0" + d.getDate()).slice(-2) +
        "" +
        ("0" + d.getHours()).slice(-2) +
        "" +
        ("0" + d.getMinutes()).slice(-2) +
        "" +
        ("0" + d.getSeconds()).slice(-2);

      const dateTime =
        ("0" + d.getDate()).slice(-2) +
        "/" +
        ("0" + (d.getMonth() + 1)).slice(-2) +
        "/" +
        d.getFullYear();
      await axios
        .post(
          `${Base_URL}/createcomplaint`,
          {
            appId,
            note,
            dateTime,
            name,
            email,
            category,
            description,
            status,
          },
          {
            headers: { Authorization: token },
          }
        )
        .then((res) => {
          toast.success(res.data.message, {
            position: toast.POSITION.TOP_RIGHT,
            className: "toast-message",
            autoClose: 2000,
          });

          handleClose();
          setCategory(undefined);
          setDescription(undefined);
        })
        .catch((e) => {
          toast.error("Something went wrong!", {
            position: toast.POSITION.TOP_RIGHT,
            className: "toast-message",
            autoClose: 2000,
          });
          console.log(e);
        });
    }
  }

  return (
    <React.Fragment>
      <div className="new-comp" style={{ cursor: "pointer" }}>
        {auth.enum === 1 ? (
          <div onClick={handleClickOpen} className=" new-comp-2">
            <div className="icon">
              <AddCircleIcon style={{ fontSize: "24px" }} />
            </div>
            <div className="text">New Complaint</div>
          </div>
        ) : (
          ""
        )}
        <Dialog open={open} onClose={handleClose}>
          <div className="comp-container">
            <div className="form-data">
              <div className="form-container">
                <div className="complaint-title ">
                  <h4 className="">New Complaint</h4>
                </div>
                <div className="input">
                  <label className="label-enter">Name:</label>
                  <input
                    style={{ outline: "none" }}
                    type="text"
                    className="inp"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>

                <div className="input">
                  <label className="label-enter">Email:</label>
                  <input
                    type="email"
                    value={auth.email}
                    disabled
                    className="inp"
                  />
                </div>

                <div className="input">
                  <label className="label-enter">Category:</label>
                  <select
                    style={{ outline: "none" }}
                    className="inp"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="electric">electric</option>
                    <option value="furniture">furniture</option>
                    <option value="plumber">plumber</option>
                    <option value="cleaning">cleaning</option>
                    <option value="data center">data center</option>
                  </select>
                </div>
                <div className="input">
                  <label className="label-enter">Description:</label>
                  <input
                    type="text"
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    className="inp"
                  />
                </div>
                <div
                  className={
                    error === undefined ? "invisible-error" : "visible-error"
                  }
                >
                  {error}
                </div>
                <div className="comp-btn">
                  <button
                    className="cncl"
                    style={{ outline: "none", cursor: "pointer" }}
                    variant="outlined"
                    type="reset"
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                  <button
                    className="sbmt"
                    style={{
                      outline: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                    variant="contained"
                    onClick={submit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Dialog>
      </div>
    </React.Fragment>
  );
}
