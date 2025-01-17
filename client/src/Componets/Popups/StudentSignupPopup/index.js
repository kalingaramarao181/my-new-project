import React, { useState } from "react";
import Popup from "reactjs-popup";
import "./index.css";
import StudentTermsAndConditions from "../StudentTermsAndConditions";
import axios from "axios";
import { baseUrl } from "../../config";

const StudentSignupPopup = ({ isPopupOpenStudentSignup, closePopupStudentSignup }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    studentID: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    email: "",
    password: "",
    confirmPassword: "",
    contactNumber: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [isPopupOpenTC, setIsPopupOpenTC] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    setErrors({ ...errors, [name]: "" }); // Clear error for the field
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.firstName.trim())
      formErrors.firstName = "First name is required.";
    if (!formData.lastName.trim())
      formErrors.lastName = "Last name is required.";
    if (!formData.studentID.trim())
      formErrors.studentID = "Student ID is required.";
    if (!formData.address1.trim()) formErrors.address1 = "Address is required.";
    if (!formData.city.trim()) formErrors.city = "City is required.";
    if (!formData.state.trim()) formErrors.state = "State is required.";
    if (!formData.zip.trim()) formErrors.zip = "ZIP code is required.";
    if (!formData.email.trim()) formErrors.email = "Email is required.";
    if (!formData.password) formErrors.password = "Password is required.";
    if (formData.password !== formData.confirmPassword) {
      formErrors.confirmPassword = "Passwords do not match.";
    }
    if (!formData.contactNumber.trim())
      formErrors.contactNumber = "Contact number is required.";
    if (!formData.agreeToTerms)
      formErrors.agreeToTerms = "You must agree to the terms and conditions.";
    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    // Prepare data for the backend
    const requestData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      mobile: formData.contactNumber,
      memberType: "student",
      password: formData.password,
    };

    try {
      const response = await axios.post(`${baseUrl}signup`, requestData);
      if (response.status === 201) {
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
          closePopupStudentSignup();
        }, 3000);

        // Reset form data
        setFormData({
          firstName: "",
          lastName: "",
          studentID: "",
          address1: "",
          address2: "",
          city: "",
          state: "",
          zip: "",
          email: "",
          password: "",
          confirmPassword: "",
          contactNumber: "",
          agreeToTerms: false,
        });
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setErrors({ general: error.response?.data?.error || "Something went wrong. Please try again." });
    }
  };

  return (
    <Popup
      open={isPopupOpenStudentSignup}
      onClose={closePopupStudentSignup}
      modal
      nested
      contentStyle={{ zIndex: 1100, borderRadius: "12px", padding: "20px" }}
      overlayStyle={{ zIndex: 1100, backgroundColor: "rgba(0, 0, 0, 0.6)" }}
    >
      <div className="signup-popup-container">
        <button className="signup-popup-close-btn" onClick={closePopupStudentSignup}>
          &times;
        </button>
        <h1 className="signup-popup-title">Student Registration</h1>
        <form className="signup-popup-form" onSubmit={handleSubmit}>
          <div className="signup-popup-row">
            <div className="signup-popup-form-group">
              <label>
                First Name <span className="required">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
              />
              {errors.firstName && (
                <p className="error-message">{errors.firstName}</p>
              )}
            </div>
            <div className="signup-popup-form-group">
              <label>
                Last Name <span className="required">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
              />
              {errors.lastName && (
                <p className="error-message">{errors.lastName}</p>
              )}
            </div>
          </div>
          <div className="signup-popup-form-group">
            <label>
              Student ID <span className="required">*</span>
            </label>
            <input
              type="text"
              name="studentID"
              value={formData.studentID}
              onChange={handleChange}
              placeholder="Enter your student ID"
            />
            {errors.studentID && (
              <p className="error-message">{errors.studentID}</p>
            )}
          </div>
          <div className="signup-popup-form-group">
            <label>
              Address 1 <span className="required">*</span>
            </label>
            <input
              type="text"
              name="address1"
              value={formData.address1}
              onChange={handleChange}
              placeholder="Enter address line 1"
            />
            {errors.address1 && (
              <p className="error-message">{errors.address1}</p>
            )}
          </div>
          <div className="signup-popup-form-group">
            <label>Address 2</label>
            <input
              type="text"
              name="address2"
              value={formData.address2}
              onChange={handleChange}
              placeholder="Enter address line 2"
            />
          </div>
          <div className="signup-popup-row">
            <div className="signup-popup-form-group">
              <label>
                City <span className="required">*</span>
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter your city"
              />
              {errors.city && <p className="error-message">{errors.city}</p>}
            </div>
            <div className="signup-popup-form-group">
              <label>
                State <span className="required">*</span>
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="Enter your state"
              />
              {errors.state && <p className="error-message">{errors.state}</p>}
            </div>
            <div className="signup-popup-form-group">
              <label>
                ZIP <span className="required">*</span>
              </label>
              <input
                type="text"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                placeholder="Enter ZIP code"
              />
              {errors.zip && <p className="error-message">{errors.zip}</p>}
            </div>
          </div>
          <div className="signup-popup-form-group">
            <label>
              Email <span className="required">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>
          <div className="signup-popup-row">
            <div className="signup-popup-form-group">
              <label>
                Password <span className="required">*</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter a password"
              />
              {errors.password && (
                <p className="error-message">{errors.password}</p>
              )}
            </div>
            <div className="signup-popup-form-group">
              <label>
                Confirm Password <span className="required">*</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && (
                <p className="error-message">{errors.confirmPassword}</p>
              )}
            </div>
          </div>
          <div className="signup-popup-form-group">
            <label>
              Contact Number <span className="required">*</span>
            </label>
            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              placeholder="Enter your contact number"
            />
            {errors.contactNumber && (
              <p className="error-message">{errors.contactNumber}</p>
            )}
          </div>
          <div className="signup-popup-terms">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
            />
            <label>
              I agree to the <span className="terms-link" onClick={() => setIsPopupOpenTC(true)}>Terms and Conditions</span> of registration
              <span className="required">*</span>
            </label>
          </div>
          {errors.agreeToTerms && (
            <p className="error-message">{errors.agreeToTerms}</p>
          )}
          <button className="signup-popup-submit-btn" type="submit">
            Submit
          </button>
        </form>
        {showPopup && (
          <div className="signup-popup-success">
            Registration Successfully Submitted!
          </div>
        )}
      </div>
      <StudentTermsAndConditions
        isPopupOpenTC={isPopupOpenTC}
        closePopupTC={() => setIsPopupOpenTC(false)}
      />
    </Popup>
  );
};

export default StudentSignupPopup;
