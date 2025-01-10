// Dashboard/index.js
import React, { useState } from "react";
import "./index.css";
import Sidebar from "../../Sidebar";

const VolunteerRegistration = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    volunteerType: '',
    subject: '',
    aboutYou: '',
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
      volunteerType: '',
      subject: '',
      aboutYou: '',
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
    }, 3000);
  };


  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
    <div className={`dashboard-page ${isCollapsed ? "sidebar-collapsed" : ""}`}>
      <Sidebar onToggleSidebar={toggleSidebar}  isCollapsed={isCollapsed} />
      <div className="main-content">
      <div className="volunteerregistration-container">
      <h1 className="volunteerregistration-title">Volunteer Registration</h1>
      <form className="volunteerregistration-form" onSubmit={handleSubmit}>
        <div className="volunteerregistration-row">
          <div className="volunteerregistration-form-group">
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
          <div className="volunteerregistration-form-group">
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
        <div className="volunteerregistration-form-group">
          <label>Volunteer Type</label>
          <select
            name="volunteerType"
            value={formData.volunteerType}
            onChange={handleChange}
            required
          >
            <option value="">Select Volunteer Type</option>
            <option value="Teacher">Teacher</option>
            <option value="Teaching Assistant">Teaching Assistant</option>
            <option value="Back Office">Back Office</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div className="volunteerregistration-form-group">
          <label>Subject</label>
          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          >
            <option value="">Select Subject</option>
            <option value="Tamil">Tamil</option>
            <option value="Literature">Literature</option>
            <option value="English">English</option>
            <option value="Math">Math</option>
            <option value="Science">Science</option>
            <option value="Social">Social</option>
            <option value="History">History</option>
            <option value="Yoga">Yoga</option>
            <option value="Financial Education">Financial Education</option>
          </select>
        </div>
        <div className="volunteerregistration-form-group">
          <label>About You and Your Interests</label>
          <textarea
            name="aboutYou"
            value={formData.aboutYou}
            onChange={handleChange}
            placeholder="Tell us about yourself and your interests"
            required
          />
        </div>
        <div className="volunteerregistration-form-group">
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
        <div className="volunteerregistration-form-group">
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
        <div className="volunteerregistration-form-group">
          <label>Address 2</label>
          <input
            type="text"
            name="address2"
            value={formData.address2}
            onChange={handleChange}
            placeholder="Enter address line 2"
          />
        </div>
        <div className="volunteerregistration-row">
          <div className="volunteerregistration-form-group">
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
          <div className="volunteerregistration-form-group">
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
          <div className="volunteerregistration-form-group">
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
        <div className="volunteerregistration-form-group">
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
        <div className="volunteerregistration-row">
          <div className="volunteerregistration-form-group">
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
          <div className="volunteerregistration-form-group">
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
        <div className="volunteerregistration-form-group">
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
        <div className="volunteerregistration-terms">
          <input
            type="checkbox"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
            required
          />
          <label>I agree to the Terms and Conditions of registration</label>
        </div>
        <button className="volunteerregistration-submit-btn" type="submit">
          Submit
        </button>
      </form>
      {showPopup && (
        <div className="volunteerregistration-popup">
          Registration Successfully Submitted!
        </div>
      )}
    </div>
      </div>
    </div>
    </>
  );
};

export default VolunteerRegistration;