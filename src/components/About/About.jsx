import React from "react";
import { useAuth } from "../../context/auth";
import Footer from "../Footer/footer";

const About = () => {
  const [auth, setAuth] = useAuth();
  return (
    <>
      <div>
        <div
          style={{ marginLeft: "150px", marginRight: "150px" }}
          className=" mt-5"
        >
          <h1 className="display-4">About this app</h1>
          <hr />

          <div className="mt-5 row">
            <div className="col-12">
              <div className="p-5">
                <p>
                  <p className="mb-2">
                    <b>Introduction:</b> <hr /> ▪️ Our intuitive interface
                    ensures a hassle-free experience for submitting complaints
                    or feedback. <br />
                    ▪️ Stay informed with real-time track on the status and
                    resolution progress of your submitted complaints.
                    <br /> ▪️ Your security and privacy are our top priorities.
                    We employ robust encryption and access controls to safeguard
                    your information.
                    <br /> ▪️ Share your thoughts on the resolution process,
                    helping us understand your satisfaction levels and driving
                    continuous improvement.
                  </p>
                  <br />
                  <p className="mb-2">
                    <b>Purpose of the App:</b> <hr /> ▪️ Provides a centralized
                    system for users to report problems or issues they
                    encounter.
                    <br /> ▪️ Explain how the Enables organizations to address
                    and resolve customer complaints promptly. <br /> ▪️ Aids in
                    identifying patterns and trends in customer complaints,
                    helping organizations identify and address systemic issues.
                    <br /> ▪️ Facilitates data-driven decision-making for
                    quality improvement initiatives. <br /> ▪️ Collects data on
                    customer complaints for analysis and reporting.
                    <br /> ▪️ Enables organizations to track performance metrics
                    and measure the effectiveness
                  </p>
                  <br />
                  <p className="mb-2">
                    <b>How It Works:</b>
                    <hr /> ▪️ Users typically need to register or log in to the
                    app using their credentials.
                    <br /> ▪️ Users submit their complaints through the app.
                    <br /> ▪️ This may involve filling out a form or providing
                    details about the nature of the complaint.
                    <br /> ▪️ This step helps in tracking and responding to
                    individual complaints.
                  </p>{" "}
                  <br />
                  <p className="mb-2">
                    <b>Features: </b>
                    <hr /> ▪️ Secure user registration and authentication to
                    ensure that complaints are submitted by legitimate users.{" "}
                    <br />
                    ▪️ User-friendly interface for easy navigation and
                    submission of complaints, with clear instructions and
                    prompts.
                    <br /> ▪️ A structured form for users to provide detailed
                    information about their complaints, including relevant
                    details.
                    <br /> ▪️ Categorization of complaints to help organize and
                    prioritize them, facilitating efficient handling by the
                    organization.
                    <br /> ▪️ Tracking mechanism for users to monitor the
                    progress of their complaints and receive updates on the
                    resolution status.
                    <br /> ▪️ Robust privacy and security measures to protect
                    user data and ensure compliance with data protection
                    regulations.
                  </p>{" "}
                  <br />
                  <p className="mb-2">
                    <b>User Benefits:</b> <hr /> ▪️ A complaint box app provides
                    users with a convenient and accessible platform to voice
                    their concerns. <br /> ▪️ An intuitive and user-friendly
                    interface makes it easy for users to submit complaints
                    without encountering unnecessary complexity.
                    <br /> ▪️ Users can track the status and progress of their
                    complaints in real-time. This transparency ensures that
                    users are kept informed throughout the resolution process,
                    reducing frustration and uncertainty.
                    <br /> ▪️ By actively participating in the feedback process,
                    users contribute to the organization's efforts in continuous
                    improvement.
                  </p>{" "}
                  <br />
                  <p className="mb-2">
                    <b>Security and Privacy:</b> <hr /> ▪️ Implement robust
                    authentication mechanisms to ensure that only authorized
                    users can access and submit complaints. <br /> ▪️ Implement
                    role-based access controls to restrict access to sensitive
                    data and features. Only authorized personnel should have
                    access to user complaints and their details.
                    <br /> ▪️ Use strong encryption protocols to protect data
                    during transmission between the user's device and the
                    server. This helps prevent unauthorized access to sensitive
                    information.
                  </p>
                </p>
                <p className="lead"></p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="mb-5"
          style={{ marginLeft: "30px", marginRight: "30px" }}
        >
          <Footer />
        </div>
      </div>
    </>
  );
};

export default About;
