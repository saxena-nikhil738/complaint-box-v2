import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import "./complaint.css";
import { toast } from "react-toastify";
import Base_URL from "../../config/Config";
const CompaintCard = (propsval) => {
  const [compData, setCompData] = useState([]);
  const [status, setStatus] = useState();
  const [note, setNote] = useState("");
  const [noteFlag, setNoteFlag] = useState(false);

  // User is currently on this page
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRocordPerPage] = useState(10);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  // Records to be displayed on the current page
  const currentRecords = compData.slice(indexOfFirstRecord, indexOfLastRecord);

  const nPages = Math.ceil(compData.length / recordsPerPage);
  const temp = [];
  const n = recordsPerPage;

  let e = propsval.e;
  useEffect(() => {
    axios
      .get(`${Base_URL}/pending`)
      .then((res) => {
        // set(res.data);
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].status === "pending") {
            temp[i] = res.data[i];
          }
        }

        temp.sort((a, b) => parseInt(b.appId, 10) - parseInt(a.appId, 10));
        setCompData(temp);
      })
      .catch((err) => console.log(err));
  }, [e.category]);

  const twoCalls = async (id, k) => {
    const state = k.target.value;

    await axios
      .put(`${Base_URL}/updatedstatus`, {
        id,
        state,
      })
      .then((user) => {
        setStatus(k.target.value);
      })
      .catch((err) => console.log(err));
  };

  const addNote = async (id) => {
    const value = note;

    setNoteFlag(!noteFlag);
    await axios
      .put(`${Base_URL}/noteadded`, {
        id,
        value,
      })

      .then((res) => {
        toast.success("Note added please refresh!", {
          position: toast.POSITION.TOP_RIGHT,
          className: "toast-message",
          autoClose: 2000,
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className=" mt-4 " key={e._id}>
      <Card className="card-1 class-3d">
        <div className="row">
          <div className="col-5 ml-3">
            <p className=" mt-2">
              {" "}
              <b>Application id:</b> {e.appId}
            </p>
            <p className="">
              <b>Name:</b> {e.name}
            </p>
            <p className="">
              <b>Title:</b> {e.category}
            </p>
          </div>
          <div className="col-4">
            <p className=" mt-2">
              <b>Date:</b> {e.dateTime}
            </p>
            <p className="">
              <b>Email:</b> {e.email}
            </p>
            <p>
              <label>
                <b>status: </b>
                <select
                  value={e._id.status}
                  onChange={(k) => twoCalls(e._id, k)}
                >
                  <option>{e.status}</option>
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </label>
            </p>
          </div>
          <div className="col-2">
            <button
              variant="contained"
              className={"buttonInvisible mt-5 btn-1"}
              onClick={() => {
                setNoteFlag(!noteFlag);
                setNote(e.note);
              }}
              value={e._id}
            >
              Add Note
            </button>
          </div>
        </div>

        <p
          className="desc  mt-2"
          style={{ marginLeft: "10px", marginRight: "10px" }}
        >
          <b>Description:</b> {e.description}
        </p>
        <p
          style={{ marginLeft: "10px", marginRight: "10px" }}
          className={
            e.note === undefined || e.note === "NULL" ? "invisible" : "visible "
          }
        >
          <b>Note: </b>
          {e.note}
        </p>
        {noteFlag === true ? (
          <div className="row">
            <textarea
              className="w-75 ml-5 mb-2 textarea-1"
              placeholder="Add a note here"
              name="note"
              value={note === "NULL" ? "" : note}
              onChange={(e1) => {
                setNote(e1.target.value);
              }}
            ></textarea>
            <input
              className="ml-5 h-25 buttonInvisible btn-2"
              type="submit"
              onClick={() => addNote(e._id)}
            />
          </div>
        ) : (
          ""
        )}
      </Card>
    </div>
  );
};

export default CompaintCard;
