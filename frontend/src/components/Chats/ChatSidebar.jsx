import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import "./chat.css";
import { Button } from "react-bootstrap";
import SendIcon from "@mui/icons-material/Send";
import { Link, NavLink } from "react-router-dom";
import img from "../../image/chat-image.jpg";

const ChatSidebar = () => {
  const [auth, setAuth] = useAuth();
  const [idList, setIdList] = useState([]);
  const [currentId, setCurrentId] = useState();
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [load, setLoad] = useState(false);

  const chatStyle = {
    background: 'url("../../image/chat-image.jpg")',
    backgroundSize: "cover",
    height: "300px", // Adjust the height accordingly
    padding: "20px",
    color: "white", // Set the text color to be visible against the background
  };

  useEffect(() => {
    async function fetchAppId() {
      const id = auth.email;
      console.log();
      try {
        const res = await axios.get("http://localhost:8000/getappid", {
          params: {
            email: id,
          },
        });
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
      const email_id = auth.email;
      try {
        const res = await axios.get("http://localhost:8000/getchats", {
          params: {
            id: currentId,
            email: email_id,
          },
        });
        setChats(res?.data?.messages);
        var container = document.getElementById("chat-align");
        if (res?.data) container.scrollTop = container.scrollHeight;
      } catch (error) {
        console.log(error);
      }
    }
    getChats();
  }, [message, currentId]);

  const sendMessage = async (cap) => {
    setLoad(!load);
    if (message !== "") {
      //   getChats();
      try {
        const email_id = auth.email;
        const user = auth.username;
        const diffId = auth.enum;
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
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="outer-chat">
      <div className="chat-container row">
        <div className="col-3 sidebar">
          <div className="chat-head">Chats</div>
          <hr style={{ height: "5px", color: "black" }} />
          {idList.map((item) => {
            return (
              <div className="chat-ids ">
                <NavLink
                  to={`/main/chat/${item.appId}`}
                  activeStyle={{ color: "#5754a8" }}
                  className="chat-id"
                  onClick={() => setCurrentId(item.appId)}
                >
                  {item.appId}
                </NavLink>
              </div>
            );
          })}
        </div>
        <div className="col-9 main-chat">
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
                    {auth.email[0].toUpperCase()}
                  </p>{" "}
                  Application id:{"  "}
                  {currentId}
                </p>
              </div>

              <hr />
              <div className="flex">
                {chats?.length > 0 ? (
                  <div id="chat-align" className="chat-align">
                    {chats.map((e) => {
                      return (
                        <>
                          <div className="details ">
                            {e.diffId == auth.enum ? (
                              <div className="pretty chat-right">
                                {e.message}
                              </div>
                            ) : (
                              <div className="pretty chat-left">
                                {e.message}
                              </div>
                            )}
                          </div>
                        </>
                      );
                    })}
                  </div>
                ) : (
                  <div style={{ chatStyle }}></div>
                )}

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
                  <div>
                    <SendIcon
                      className="sendIcon"
                      style={{ cursor: "pointer" }}
                      fontSize="large"
                      onClick={() => sendMessage(currentId)}
                    />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;
