import React from "react";
import Popup from "reactjs-popup";
import "./index.css";

const VolunteerTermsAndConditions = ({ isPopupOpenVolunteerTC, closePopupVolunteerTC }) => {
  return (
    <Popup
      open={isPopupOpenVolunteerTC}
      onClose={closePopupVolunteerTC}
      modal
      nested
      contentStyle={{ zIndex: 1100, borderRadius: "12px", padding: "20px" }}
      overlayStyle={{ zIndex: 1100, backgroundColor: "rgba(0, 0, 0, 0.6)" }}
    >
      <div className="tc-popup-container">
        <button className="tc-popup-close-btn" onClick={closePopupVolunteerTC}>
          &times;
        </button>
        <h1 className="tc-popup-title">Volunteer Terms and Conditions</h1>
        <p className="tc-popup-content">
          Please read these terms and conditions carefully before volunteering.
        </p>
        <div className="tc-popup-condition">
          <h2>1. Volunteer Agreement</h2>
          <p>
            By agreeing to volunteer, you acknowledge that you are offering your
            services voluntarily and without expectation of compensation. You
            understand that you are not an employee of our organization and are
            not entitled to any benefits or protections afforded to employees.
          </p>

          <h2>2. Code of Conduct</h2>
          <p>
            As a volunteer, you agree to conduct yourself in a professional and
            ethical manner at all times. This includes treating all individuals
            with respect, maintaining confidentiality of sensitive information,
            and adhering to all organizational policies and procedures.
          </p>

          <h2>3. Safety and Liability</h2>
          <p>
            While we strive to provide a safe environment for all volunteers,
            you understand and acknowledge that there may be risks associated
            with volunteer activities. You agree to follow all safety guidelines
            and instructions provided by the organization.
          </p>

          <h2>4. Termination of Volunteer Service</h2>
          <p>
            The organization reserves the right to terminate your volunteer
            service at any time, for any reason. Similarly, you may choose to
            end your volunteer service at any time by notifying the appropriate
            supervisor or coordinator.
          </p>

          <h2>5. Use of Likeness</h2>
          <p>
            You grant the organization permission to use your name, voice, and
            image in photographs, videos, or other recordings for promotional or
            educational purposes without compensation.
          </p>
        </div>
      </div>
    </Popup>
  );
};

export default VolunteerTermsAndConditions;
