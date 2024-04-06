import axios from "axios";
import { useEffect, useState } from "react";
import "./complaint.css";
import Records from "./records";
import Pagination from "./Pagination";
import { FormDialog } from "../Main/main";
import { useAuth } from "../../context/auth";
import NewComplaint from "./newComplaint";
import NoRecord from "../Main/NoRecord";
import Spinner from "react-spinner-material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Base_URL from "../../config/Config";
import * as Cookies from "es-cookie";
import SearchIcon from "@mui/icons-material/Search";

const Complaint = ({ ele }) => {
  const [compData, setCompData] = useState([]);
  const [type, setType] = useState(window.innerWidth > 998);
  const [auth, setAuth] = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRocordPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = compData.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(compData.length / recordsPerPage);
  const temp = [];
  const [search, setSearch] = useState("");
  let j = 0;

  async function fun() {
    const status = ele.charAt(0).toUpperCase() + ele.slice(1);

    // const endpoint = auth.enum === 1 ? `usercomp` : `admincomp`;
    const endpoint = `complaint`;
    const token = Cookies.get("token");
    try {
      await axios
        .get(`${Base_URL}/${endpoint}`, {
          headers: {
            Authorization: token,
          },
          params: {
            status: status,
          },
        })
        .then((res) => {
          for (var i = 0; i < res.data?.length; i++) {
            temp[j++] = res.data[i];
          }
          temp.sort((a, b) => parseInt(b.appId, 10) - parseInt(a.appId, 10));
          setCompData(temp);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fun();
  }, [auth, ele, recordsPerPage]);

  if (loading) {
    return (
      <div className="spindiv">
        <div className="spin">
          <Spinner />
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="">
        <div className="row left-right">
          <div className="left-content">
            <FormDialog />
            <div className="npages-mb">
              <div className="rec-per-page">Records: </div>{" "}
              <select
                name="pages"
                id=""
                value={recordsPerPage}
                onChange={(e) => {
                  setRocordPerPage(e.target.value);
                }}
              >
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            </div>
          </div>
          <div className="right-content">
            <div className="search-npages">
              <div className=" middle">
                <input
                  className=" search "
                  disabled={currentRecords.length <= 0}
                  type="search"
                  placeholder="Search by name"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <i>
                  <SearchIcon className="search-icon" />
                </i>
              </div>

              <div className="npages">
                <div className="rec-per-page">Records per page: </div>{" "}
                <select
                  name="pages"
                  id=""
                  value={recordsPerPage}
                  onChange={(e) => {
                    setRocordPerPage(e.target.value);
                  }}
                >
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
              </div>
            </div>

            <div className="type">{ele?.toUpperCase() + " COMPLAINTS"}</div>
            <div className="right-comp">
              <Records item={currentRecords} search={search} />
              <div className="mt-5">
                {currentRecords?.length <= 0 ? (
                  <NoRecord />
                ) : currentRecords?.length < 10 ? (
                  <Pagination
                    disabled
                    nPages={nPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                  />
                ) : (
                  <Pagination
                    disabled
                    nPages={nPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Complaint;
