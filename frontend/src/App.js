import "./App.css";
import Header from "./components/Header/header";
import { Routes, Route } from "react-router-dom";
import Login from "./components/account/login";
import Signup from "./components/account/signup";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Dashboard from "./components/Dashboard/Dashboard";
import PrivateRoute from "./components/Routes/PrivateRoute";
import PageNotFound from "./components/InvalidRoute/PageNotFound";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChatSidebar from "./components/Chats/ChatSidebar";
import ReplyChat from "./components/Chats/ReplyChat";
import Complaint from "./components/Complaints/Complaint";

function App() {
  {
    document.title = `Complaint-Box`;
  }
  return (
    <div>
      <ToastContainer />
      <Header />
      <div className="scroll">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/main" element={<PrivateRoute />}>
            <Route path="" element={<Complaint />} />
            <Route path="reply" element={<ReplyChat />} />
            <Route path="chat/:id" element={<ChatSidebar />} />
            <Route path="reply/chat/:id" element={<ReplyChat />} />
            <Route path="chat" element={<ChatSidebar />} />
            <Route path="allcomplaint" element={<Complaint ele={"all"} />} />
            <Route path="approved" element={<Complaint ele={"approved"} />} />
            <Route path="pending" element={<Complaint ele={"pending"} />} />
            <Route path="rejected" element={<Complaint ele={"rejected"} />} />
            <Route
              path="processing"
              element={<Complaint ele={"processing"} />}
            />
          </Route>
          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route path="" element={<Dashboard />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup endpoint={"signup"} />} />
          <Route path="/userlogin" element={<Login />} />
          <Route path="/usersignup" element={<Signup endpoint={"usersignup"} />} />
          <Route path="/logout" element={<Home />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
