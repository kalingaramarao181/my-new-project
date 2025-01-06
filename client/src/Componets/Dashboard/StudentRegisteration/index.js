// Dashboard/index.js
import React, { useState, useEffect } from "react";
import "./index.css";
import Sidebar from "../../Sidebar";

const StudentRegisteration = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    studentID: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    email: '',
    password: '',
    confirmPassword: '',
    contactNumber: '',
    agreeToTerms: false,
  });

  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.agreeToTerms) {
      alert('You must agree to the Terms and Conditions!');
      return;
    }

    console.log('Form Data:', formData);
    setShowPopup(true);

    // Reset form data after submission
    setFormData({
      firstName: '',
      lastName: '',
      studentID: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      email: '',
      password: '',
      confirmPassword: '',
      contactNumber: '',
      agreeToTerms: false,
    });

    setTimeout(() => {
      setShowPopup(false);
    }, 3000); // Popup disappears after 3 seconds
  };

  // Handlers for popup
  const togglePopup = () => setIsPopupOpen(!isPopupOpen);

  // Toggle Sidebar
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
    <div className={`dashboard-page ${isCollapsed ? "sidebar-collapsed" : ""}`}>
      <Sidebar onToggleSidebar={toggleSidebar}  isCollapsed={isCollapsed} />
      <div className="main-content">
      <div className="studentregister-container">
      <h1 className="studentregister-title">Student Registration</h1>
      <form className="studentregister-form" onSubmit={handleSubmit}>
        <div className="studentregister-row">
          <div className="studentregister-form-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
              required
            />
          </div>
          <div className="studentregister-form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
              required
            />
          </div>
        </div>
        <div className="studentregister-form-group">
          <label>Student ID</label>
          <input
            type="text"
            name="studentID"
            value={formData.studentID}
            onChange={handleChange}
            placeholder="Enter your student ID"
            required
          />
        </div>
        <div className="studentregister-form-group">
          <label>Address 1</label>
          <input
            type="text"
            name="address1"
            value={formData.address1}
            onChange={handleChange}
            placeholder="Enter address line 1"
            required
          />
        </div>
        <div className="studentregister-form-group">
          <label>Address 2</label>
          <input
            type="text"
            name="address2"
            value={formData.address2}
            onChange={handleChange}
            placeholder="Enter address line 2"
          />
        </div>
        <div className="studentregister-row">
          <div className="studentregister-form-group">
            <label>City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter your city"
              required
            />
          </div>
          <div className="studentregister-form-group">
            <label>State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="Enter your state"
              required
            />
          </div>
          <div className="studentregister-form-group">
            <label>ZIP</label>
            <input
              type="text"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              placeholder="Enter ZIP code"
              required
            />
          </div>
        </div>
        <div className="studentregister-form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="studentregister-row">
          <div className="studentregister-form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter a password"
              required
            />
          </div>
          <div className="studentregister-form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
          </div>
        </div>
        <div className="studentregister-form-group">
          <label>Contact Number</label>
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            placeholder="Enter your contact number"
            required
          />
        </div>
        <div className="studentregister-terms">
          <input
            type="checkbox"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
            required
          />
          <label>I agree to the Terms and Conditions of registration</label>
        </div>
        <button className="studentregister-submit-btn" type="submit">
          Submit
        </button>
      </form>
      {showPopup && (
        <div className="studentregister-popup">
          Registration Successfully Submitted!
        </div>
      )}
    </div>
      </div>
    </div>
    </>
  );
};

export default StudentRegisteration;