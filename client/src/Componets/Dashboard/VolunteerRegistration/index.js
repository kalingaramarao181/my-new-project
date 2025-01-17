// Dashboard/index.js
import React, { useState } from "react";
import "./index.css";
import Sidebar from "../../Sidebar";

const VolunteerRegistration = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
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
    volunteerType: '',
    subject: '',
    about: ''
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
      volunteerType: '',
      subject: '',
      about: ''
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

      <div className="volunteer-registration-container">
      <h1 className="volunteer-registration-title">Volunteer Registration</h1>
      <form className="volunteer-registration-form" onSubmit={handleSubmit}>
        <div className="volunteer-registration-row">
          <div className="volunteer-registration-form-group">
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
          <div className="volunteer-registration-form-group">
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
        <div className="volunteer-registration-form-group">
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
        <div className="volunteer-registration-form-group">
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
        <div className="volunteer-registration-form-group">
          <label>Address 2</label>
          <input
            type="text"
            name="address2"
            value={formData.address2}
            onChange={handleChange}
            placeholder="Enter address line 2"
          />
        </div>
        <div className="volunteer-registration-row">
          <div className="volunteer-registration-form-group">
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
          <div className="volunteer-registration-form-group">
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
          <div className="volunteer-registration-form-group">
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
        <div className="volunteer-registration-form-group">
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
        <div className="volunteer-registration-row">
          <div className="volunteer-registration-form-group">
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
          <div className="volunteer-registration-form-group">
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
        <div className="volunteer-registration-form-group">
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

        <div className="volunteer-registration-form-group">
          <label>Volunteer Type <span className="required">*</span></label>
          <select 
            onChange={handleChange}
            value={formData.volunteerType}
            name="volunteerType"
            required
          >
            <option value="">Select Volunteer Type</option>
            <option value="teacher">Teacher</option>
            <option value="teachingAssistant">Teaching Assistant</option>
            <option value="backOffice">Back Office</option>
            <option value="others">Others</option>  
          </select>
        </div>

        <div className="volunteer-registration-form-group">
          <label>Subject <span className="required">*</span></label>
          <select 
            onChange={handleChange}
            value={formData.subject}
            name="subject"
            required
          >
            <option value="">Select Subject</option>
            <option value="tamil">Tamil</option>
            <option value="literature">Literature</option>
            <option value="english">English</option>
            <option value="math">Math</option>  
            <option value="science">Science</option>  
            <option value="social">Social</option>  
            <option value="history">History</option>  
            <option value="yoga">Yoga</option>  
            <option value="financialEducation">Financial Education</option>  
          </select>
        </div>

        <div className="volunteer-registration-form-group">
          <label>About you and your interests <span className="required">*</span></label>
          <textarea
            type="text"
            name="about"
            value={formData.about}
            onChange={handleChange}
            placeholder="Tell us about yourself and why you are interested in volunteering. What skills or experiences can you bring to our organization?"
            required
          />
        </div>

        <div className="volunteer-registration-terms">
          <input
            type="checkbox"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
            required
          />
          <label>I agree to the Terms and Conditions of registration</label>
        </div>
        <button className="volunteer-registration-submit-btn" type="submit">
          Submit
        </button>
      </form>
      {showPopup && (
        <div className="volunteer-registration-popup">
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
