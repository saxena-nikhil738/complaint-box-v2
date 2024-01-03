import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import "./banner.css";

const Timeline = () => {
  return (
    <div className="mt-4">
      <div className=" wrapper-t bg-light mb-5">
        <VerticalTimeline color="dark">
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            iconStyle={{ background: "rgb(86, 101, 115)", color: "#fff" }}
          >
            <h3 className="vertical-timeline-element-title">Two Modules</h3>
            <h4 className="vertical-timeline-element-subtitle">Admin | User</h4>
            <p>Login/ Signup in any module</p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            // date="2010 - 2011"
            iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
            // icon={<WorkIcon />}
          >
            <h3 className="vertical-timeline-element-title">Admin Access</h3>
            <h4 className="vertical-timeline-element-subtitle">
              After admin login
            </h4>
            <p>
              All Complaints, Pending complaints to manage and resolve them.
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            // date="2006 - 2008"
            iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
            // icon={<WorkIcon />}
          >
            <h3 className="vertical-timeline-element-title">User Access</h3>
            <h4 className="vertical-timeline-element-subtitle">
              After user login
            </h4>
            <p>
              Check their all registered complaints status, Add new complaint
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            // date="2008 - 2010"
            iconStyle={{ background: "rgb(240, 178, 122)", color: "#fff" }}
            // icon={<WorkIcon />}
          >
            <h3 className="vertical-timeline-element-title">Dashboard</h3>
            <h4 className="vertical-timeline-element-subtitle">
              After successful login
            </h4>
            <p>Manage profile, change password</p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            className="vertical-timeline-element--education"
            // date="April 2013"
            iconStyle={{ background: "rgb(88, 214, 141)", color: "#fff" }}
            // icon={<SchoolIcon />}
          >
            <h3 className="vertical-timeline-element-title">Searching</h3>
            <h4 className="vertical-timeline-element-subtitle">
              If no complaints then disabled
            </h4>
            <p>Search complaints by name</p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--education"
            // date="November 2012"
            iconStyle={{ background: "rgb(231, 76, 60)", color: "#fff" }}
            // icon={<SchoolIcon />}
          >
            <h3 className="vertical-timeline-element-title">
              Types of complaint
            </h3>
            <h4 className="vertical-timeline-element-subtitle">
              Access when authenticated
            </h4>
            <p>
              Pending complaints, Processing complaints, Solved complaints,
              rejected complaints
            </p>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </div>
    </div>
  );
};

export default Timeline;
