import "./App.css";
import Header from "./components/Header/header";
import { Routes, Route } from "react-router-dom";
import Login from "./components/account/admin/login";
import Signup from "./components/account/admin/signup";
import AllComplaints from "./components/Complaints/allComplaints";
import SolvedComplaints from "./components/Complaints/solvedComplaints";
import Pendingcomplaints from "./components/Complaints/pendingComp";
import RejectedComplaints from "./components/Complaints/rejectedComp";
import UserLogin from "./components/account/user/userLogin";
import UserSignup from "./components/account/user/UserSignup";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Dashboard from "./components/Dashboard/Dashboard";
import PrivateRoute from "./components/Routes/PrivateRoute";
import ProcessingComplaints from "./components/Complaints/processingComp";
import PageNotFound from "./components/PageNotFound";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  {
    document.title = `Complaint-Box`;
  }
  return (
    <div>
      <ToastContainer />
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/main" element={<PrivateRoute />}>
          <Route path="" element={<AllComplaints />} />
          <Route path="allcomplaints" element={<AllComplaints />} />
          <Route path="solvedcomplaints" element={<SolvedComplaints />} />
          <Route path="pendingcomplaints" element={<Pendingcomplaints />} />
          <Route path="rejectedcomplaints" element={<RejectedComplaints />} />
          <Route
            path="processingcomplaints"
            element={<ProcessingComplaints />}
          />
        </Route>

        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="" element={<Dashboard />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/userlogin" element={<UserLogin />} />
        <Route path="/usersignup" element={<UserSignup />} />
        <Route path="/logout" element={<Home />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
