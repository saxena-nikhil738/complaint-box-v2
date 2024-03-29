import React from "react";
import "react-vertical-timeline-component/style.min.css";
import Banner from "./Banner.jsx";
import "./banner.css";
import Timeline from "./Timeline.jsx";
import Footer from "../Footer/footer.jsx";

const Home = () => {
  return (
    <>
      <div className="">
        <Banner />
        <Timeline />
      </div>
      <Footer />
    </>
  );
};

export default Home;
