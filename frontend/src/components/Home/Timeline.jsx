import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import "./Timeline.css";

const Timeline = () => {
  return (
    <div className="">
      <div className=" wrapper-t">
        <VerticalTimeline color="dark">
          <VerticalTimelineElement
            className="timeline-element"
            iconStyle={{ background: "rgb(86, 101, 115)", color: "#fff" }}
          >
            <div className="for-bg">
              <h3 className="title-tag">Two Modules</h3>
              <h4 className="subtitle-tag">Admin | User</h4>
              <h3 className="tl-feature">Login/ Signup in any module</h3>
            </div>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            // date="2010 - 2011"
            iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
            // icon={<WorkIcon />}
          >
            <h3 className="title-tag">Admin Access</h3>
            <h4 className="subtitle-tag">After admin login</h4>
            <h3 className="tl-feature">
              All Complaints, Pending complaints to manage and resolve them.
            </h3>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            // date="2006 - 2008"
            iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
            // icon={<WorkIcon />}
          >
            <h3 className="title-tag">User Access</h3>
            <h4 className="subtitle-tag">After user login</h4>
            <h3 className="tl-feature">
              Check their all registered complaints status, Add new complaint
            </h3>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            // date="2008 - 2010"
            iconStyle={{ background: "rgb(240, 178, 122)", color: "#fff" }}
            // icon={<WorkIcon />}
          >
            <h3 className="title-tag">Dashboard</h3>
            <h4 className="subtitle-tag">After successful login</h4>
            <h3 className="tl-feature">Manage profile, change password</h3>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--education"
            // date="April 2013"
            iconStyle={{ background: "rgb(88, 214, 141)", color: "#fff" }}
            // icon={<SchoolIcon />}
          >
            <h3 className="title-tag">Searching</h3>
            <h4 className="subtitle-tag">If no complaints then disabled</h4>
            <h3 className="tl-feature">Search complaints by name</h3>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--education"
            // date="November 2012"
            iconStyle={{ background: "rgb(231, 76, 60)", color: "#fff" }}
            // icon={<SchoolIcon />}
          >
            <h3 className="title-tag">Types of complaint</h3>
            <h4 className="subtitle-tag">Access when authenticated</h4>
            <h3 className="tl-feature">
              Pending complaints, Processing complaints, Solved complaints,
              rejected complaints
            </h3>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </div>
    </div>
  );
};

export default Timeline;
