import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import "./chat.css";
import SendIcon from "@mui/icons-material/Send";
import { Link } from "react-router-dom";

const ReplyChat = () => {
  const [auth, setAuth] = useAuth();
  const [idList, setIdList] = useState([]);
  const [currentId, setCurrentId] = useState();
  const [emailId, setEmailId] = useState();
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    async function fetchAppId() {
      const id = auth.email;
      console.log();
      try {
        const res = await axios.get("http://localhost:8000/getallappid", {});
        console.log(res.data);
        setIdList(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchAppId();
  }, []);

  useEffect(() => {
    async function getChats() {
      //   elementRef.current.scrollIntoView({ behavior: "smooth" });
      console.log(currentId);
      const email_id = auth.email;
      try {
        const res = await axios.get("http://localhost:8000/getchats", {
          params: {
            id: currentId,
          },
        });
        setChats(res?.data?.messages);
      } catch (error) {
        console.log(error);
      }
    }
    getChats();
  }, [currentId]);

  const sendMessage = async (cap) => {
    setLoad(!load);
    if (message !== "") {
      //   getChats();
      try {
        const email_id = auth.email;
        const user = auth.username;
        const diffId = auth.enum;
        console.log(cap);
        const currentAppId = cap;
        console.log(load);
        const res = await axios.post(`http://localhost:8000/sendmessage`, {
          currentAppId,
          email_id,
          message,
          user,
          diffId,
        });
        setMessage("");
        try {
          const res = await axios.get("http://localhost:8000/getchats", {
            params: {
              id: currentId,
            },
          });
          setChats(res?.data?.messages);
        } catch (error) {
          console.log(error);
        }
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const setData = (id, email) => {
    setCurrentId(id);
    setEmailId(email);
  };

  return (
    <div className="outer-chat">
      <div className="chat-container row">
        <div className="col-3 sidebar">
          <div className="chat-head">Chat</div>
          <hr style={{ height: "5px", color: "black" }} />
          {console.log(idList)}
          {idList.map((item) => {
            return (
              <div className="chat-ids ">
                <Link
                  to={`/main/reply/chat/${item.currentAppId}`}
                  className="chat-id"
                  onClick={() => setData(item.currentAppId, item.email_id)}
                >
                  {item.currentAppId}
                </Link>
              </div>
            );
          })}
        </div>

        <div className="col-9 main-chat">
          {/* <iframe src=""> */}
          {currentId ? (
            <>
              <div className="main-chat-head">
                <p className="d-flex flex-row">
                  <p
                    style={{
                      fontSize: "20px",
                      marginRight: "10px",
                      backgroundColor: "red",
                      padding: "5px",
                      borderRadius: "32px",
                      color: "white",
                      height: "auto",
                    }}
                  >
                    {emailId[0].toUpperCase()}
                  </p>{" "}
                  Application id:{"  "}
                  {currentId}
                  <br />
                  Email id:{"  "}
                  {emailId}
                </p>
              </div>

              <hr />
              {/* <div className="alignment"> */}
              {chats?.length > 0 ? (
                <div className="chat-align">
                  {chats.map((e) => {
                    return (
                      <>
                        <div className="details ">
                          {e.diffId == auth.enum ? (
                            <div className="pretty chat-right">{e.message}</div>
                          ) : (
                            <div className="pretty chat-left">{e.message}</div>
                          )}
                        </div>
                      </>
                    );
                  })}
                </div>
              ) : (
                <div className="">
                  <p></p>
                </div>
              )}

              {/* </div> */}

              <div className="parent d-flex flex-row">
                <div className=" d-flex flex-row">
                  <input
                    className="typing_div"
                    type="text"
                    value={message}
                    placeholder="Type nessage"
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
                <div style={{ width: "50px", margin: "10px 20px" }}>
                  <SendIcon
                    style={{ cursor: "pointer" }}
                    fontSize="large"
                    onClick={() => sendMessage(currentId)}
                  />
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
          {/* </iframe> */}
        </div>
      </div>
    </div>
  );
};

export default ReplyChat;
