import React from "react";
import { useAuth } from "../../context/auth";
import Footer from "../Footer/footer";
import "../About/About.css";

const About = () => {
  const [auth, setAuth] = useAuth();
  return (
    <>
      <div>
        <div className="about">
          <h1 className="display-4">About this app</h1>
          <hr />

          <div className="parent-about">
            <p className="content-about">
              Introduction: <hr /> ▪️ Our intuitive interface ensures a
              hassle-free experience for submitting complaints or feedback.
              <br />
              ▪️ Stay informed with real-time track on the status and resolution
              progress of your submitted complaints.
              <br /> ▪️ Your security and privacy are our top priorities. We
              employ robust encryption and access controls to safeguard your
              information.
              <br /> ▪️ Share your thoughts on the resolution process, helping
              us understand your satisfaction levels and driving continuous
              improvement.
            </p>
            <p className="content-about">
              Purpose of the App: <hr /> ▪️ Provides a centralized system for
              users to report problems or issues they encounter.
              <br /> ▪️ Explain how the Enables organizations to address and
              resolve customer complaints promptly. <br /> ▪️ Aids in
              identifying patterns and trends in customer complaints, helping
              organizations identify and address systemic issues.
              <br /> ▪️ Facilitates data-driven decision-making for quality
              improvement initiatives. <br /> ▪️ Collects data on customer
              complaints for analysis and reporting.
              <br /> ▪️ Enables organizations to track performance metrics and
              measure the effectiveness
            </p>
            <p className="content-about">
              How It Works:
              <hr /> ▪️ Users typically need to register or log in to the app
              using their credentials.
              <br /> ▪️ Users submit their complaints through the app.
              <br /> ▪️ This may involve filling out a form or providing details
              about the nature of the complaint.
              <br /> ▪️ This step helps in tracking and responding to individual
              complaints.
            </p>{" "}
            <p className="content-about">
              Features:
              <hr /> ▪️ Secure user registration and authentication to ensure
              that complaints are submitted by legitimate users. <br />
              ▪️ User-friendly interface for easy navigation and submission of
              complaints, with clear instructions and prompts.
              <br /> ▪️ A structured form for users to provide detailed
              information about their complaints, including relevant details.
              <br /> ▪️ Categorization of complaints to help organize and
              prioritize them, facilitating efficient handling by the
              organization.
              <br /> ▪️ Tracking mechanism for users to monitor the progress of
              their complaints and receive updates on the resolution status.
              <br /> ▪️ Robust privacy and security measures to protect user
              data and ensure compliance with data protection regulations.
            </p>{" "}
            <p className="content-about">
              User Benefits: <hr /> ▪️ A complaint box app provides users with a
              convenient and accessible platform to voice their concerns. <br />{" "}
              ▪️ An intuitive and user-friendly interface makes it easy for
              users to submit complaints without encountering unnecessary
              complexity.
              <br /> ▪️ Users can track the status and progress of their
              complaints in real-time. This transparency ensures that users are
              kept informed throughout the resolution process, reducing
              frustration and uncertainty.
              <br /> ▪️ By actively participating in the feedback process, users
              contribute to the organization's efforts in continuous
              improvement.
            </p>{" "}
            <p className="content-about">
              Security and Privacy: <hr /> ▪️ Implement robust authentication
              mechanisms to ensure that only authorized users can access and
              submit complaints. <br /> ▪️ Implement role-based access controls
              to restrict access to sensitive data and features. Only authorized
              personnel should have access to user complaints and their details.
              <br /> ▪️ Use strong encryption protocols to protect data during
              transmission between the user's device and the server. This helps
              prevent unauthorized access to sensitive information.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default About;
