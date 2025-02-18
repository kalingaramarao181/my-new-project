import React, { useState } from "react";
import Popup from "reactjs-popup";
import "./index.css";
import StudentSignupPopup from "../StudentSignupPopup";
import VolunteerSignupPopup from "../VolunteerSignupPopup";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../config";
import ParentSignupPopup from "../ParentSignupPopup";
import PasswordUpdate from "../PasswordUpdate";

const LoginForm = ({ isPopupOpen, closePopup, role }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isPopupOpenStudentSignup, setIsPopupOpenStudentSignup] = useState(false);
  const [isPopupOpenVolunteerSignup, setIsPopupOpenVolunteerSignup] = useState(false);
  const [isPopupOpenParentSignup, setIsPopupOpenParentSignup] = useState(false);
  const [isOpenUpdatedPopup, setIsOpenUpdatedPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
  
    try {
      console.log("Starting login process...");
      const response = await axios.post(`${baseUrl}login`, { email, password }, { timeout: 5000 });
      console.log("Response received:", response);
  
      if (response.status === 200) {
        Cookies.set("token", response.data.token, { expires: 1, secure: true });
        setMessage("Login successful!");
        setTimeout(() => {
          closePopup();
          navigate("/profile");
        }, 1000);
      } else {
        setMessage("Unexpected response. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setMessage(err.response?.data?.error || "Login failed. Please try again.");
    } finally {
      setLoading(false);
      console.log("Login process complete.");
    }
  };
  

  const openSignUpForm = (role) => {
    if (role === "Student") {
      setIsPopupOpenStudentSignup(true);
    } else if (role === "Volunteer") {
      setIsPopupOpenVolunteerSignup(true);
    } else if (role === "Parent") {
      setIsPopupOpenParentSignup(true);
    }
  };

  return (
    <Popup
      open={isPopupOpen}
      onClose={closePopup}
      modal
      nested
      contentStyle={{ zIndex: 1100, borderRadius: "12px", padding: "20px" }}
      overlayStyle={{ zIndex: 1100, backgroundColor: "rgba(0, 0, 0, 0.6)" }}
    >
      <div className="login-popup">
        <div className="login-popup-content">
          <h2>Welcome to {role}</h2>
          <form onSubmit={handleLoginSubmit}>
            <label className="login-label">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label className="login-label">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="login-popup-login-button" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          {message && <p className={`login-message ${message.includes("successful") ? "success" : "error"}`}>{message}</p>}
          <p className="login-forgot-password">
            <span onClick={() => openSignUpForm(role)}>SignUp</span> / <span onClick={() => setIsOpenUpdatedPopup(true)}>Forgot Password?</span>
          </p>
          <button className="login-close-popup" onClick={closePopup}>
            Close
          </button>
        </div>
      </div>
      <StudentSignupPopup
        isPopupOpenStudentSignup={isPopupOpenStudentSignup}
        closePopupStudentSignup={() => setIsPopupOpenStudentSignup(false)}
      />
      <VolunteerSignupPopup
        isPopupOpenVolunteerSignup={isPopupOpenVolunteerSignup}
        closePopupVolunteerSignup={() => setIsPopupOpenVolunteerSignup(false)}
      />
      <ParentSignupPopup 
        isPopupOpenParentSignup={isPopupOpenParentSignup} 
        closePopupParentSignup={() => setIsPopupOpenParentSignup(false)} 
      />
      <PasswordUpdate
      isOpenUpdatedPopup={isOpenUpdatedPopup}
      closeUpdatadPopup={() => setIsOpenUpdatedPopup(false)}

      />
      
    </Popup>
  );
};

export default LoginForm;
