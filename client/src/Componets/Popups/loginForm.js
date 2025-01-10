import React, { useState } from "react";
import Popup from "reactjs-popup";
import "./index.css";

const CreateFormPopup = ({ isPopupOpen, closePopup, role }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setMessage("Login successful!"); // Example message
  };

  return (
    <Popup
      open={isPopupOpen}
      onClose={closePopup}
      modal
      nested
      contentStyle={{ zIndex: 2, borderRadius: "12px", padding: "20px" }}
      overlayStyle={{ zIndex: 1, backgroundColor: "rgba(0, 0, 0, 0.6)" }}
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
            <button type="submit" className="login-popup-login-button">
              Login
            </button>
          </form>
          {message && <p className="login-message">{message}</p>}
          <p className="login-forgot-password">SignUp / Forgot Password?</p>
          <button className="login-close-popup" onClick={closePopup}>
            Close
          </button>
        </div>
      </div>
    </Popup>
  );
};

export default CreateFormPopup;
