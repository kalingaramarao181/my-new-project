import React from "react";
import Popup from "reactjs-popup";
import "./index.css";

const StudentTermsAndConditions = ({ isPopupOpenTC, closePopupTC }) => {
  return (
    <Popup
      open={isPopupOpenTC}
      onClose={closePopupTC}
      modal
      nested
      contentStyle={{ zIndex: 1100, borderRadius: "12px", padding: "20px" }}
      overlayStyle={{ zIndex: 1100, backgroundColor: "rgba(0, 0, 0, 0.6)" }}
    >
      <div className="tc-popup-container">
        <button className="tc-popup-close-btn" onClick={closePopupTC}>
          &times;
        </button>
        <h1 className="tc-popup-title">Student Terms and Conditions</h1>
        <p className="tc-popup-content">
          Please read these terms and conditions carefully before registering as
          a student.
        </p>
        <div className="tc-popup-condition">
          <h2>1. Registration Agreement</h2>
          <p>
            By registering as a student, you agree to provide accurate and
            complete information. You are responsible for maintaining the
            confidentiality of your account and password.
          </p>

          <h2>2. Code of Conduct</h2>
          <p>
            As a student, you agree to conduct yourself in a respectful and
            ethical manner. This includes adhering to academic integrity
            policies, respecting the rights of other students and staff, and
            following all school rules and regulations.
          </p>

          <h2>3. Payment and Refunds</h2>
          <p>
            You agree to pay all fees associated with your chosen courses.
            Refund policies may vary depending on the timing of your request and
            the specific course policies.
          </p>

          <h2>4. Attendance and Participation</h2>
          <p>
            Regular attendance and active participation in your enrolled courses
            are expected. Failure to meet attendance requirements may result in
            academic penalties.
          </p>

          <h2>5. Privacy Policy</h2>
          <p>
            Your personal information will be handled in accordance with our
            privacy policy. We may use your contact information to send you
            important updates about your courses and the school.
          </p>
        </div>
      </div>
    </Popup>
  );
};

export default StudentTermsAndConditions;
