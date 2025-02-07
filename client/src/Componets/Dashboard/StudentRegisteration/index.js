// Dashboard/index.js
import React, { useState, useEffect } from "react";
import "./index.css";
import Sidebar from "../../Sidebar";
import StudentTermsAndConditions from "../../Popups/StudentTermsAndConditions";
import { signupUser } from "../../api";
import { formValidation } from "../../formValidation";
import { countries } from "../../countries";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const StudentRegisteration = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isPopupOpenTC, setIsPopupOpenTC] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    title: "",
    studentID: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    email: "",
    memberType: 4,
    password: "",
    confirmPassword: "",
    contactNumber: "",
    agreeToTerms: false,
    roleId: 4,
    country: "",
    updatedBy: "",
  });

  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const token = Cookies.get("token");

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      setFormData({
        ...formData,
        updatedBy: decodedToken.userId
      });
    }
  }, [token]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = await formValidation(formData);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const requestData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      studentID: formData.studentID,
      title: formData.title,
      address1: formData.address1,
      address2: formData.address2,
      city: formData.city,
      state: formData.state,
      zip: formData.zip,
      email: formData.email,
      mobile: formData.contactNumber,
      memberType: 4,
      password: formData.password,
      roleId: formData.roleId,
      country: formData.country,
    };

    try {
      const response = await signupUser(requestData);
      if (response.status === 201) {
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000);
        setFormData({
          firstName: "",
          lastName: "",
          address1: "",
          address2: "",
          city: "",
          state: "",
          zip: "",
          email: "",
          contactNumber: "",
          password: "",
          confirmPassword: "",
        });
        window.location.reload();
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setErrors({
        general:
          error.response?.data?.error ||
          "Something went wrong. Please try again.",
      });
    }
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <div
        className={`dashboard-page ${isCollapsed ? "sidebar-collapsed" : ""}`}
      >
        <Sidebar onToggleSidebar={toggleSidebar} isCollapsed={isCollapsed} />
        <div className="main-content">
          <div className="student-register-container">
            <h1 className="studentregister-title">Student Registration</h1>
            <form className="studentregister-form" onSubmit={handleSubmit}>
              <div className="studentregister-row">
                <div className="studentregister-form-group">
                  <label>
                    Title <span className="required">*</span>
                  </label>
                  <select
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                  >
                    <option value="">Select Title</option>
                    <option value="Male">Mr.</option>
                    <option value="Female">Ms.</option>
                  </select>
                  {errors.title && (
                    <p className="error-message">{errors.title}</p>
                  )}
                </div>
                <div className="studentregister-form-group">
                  <label>
                    First Name<span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter your first name"
                    required
                  />
                  {errors.firstName && (
                    <p className="error-message">{errors.firstName}</p>
                  )}
                </div>
                <div className="studentregister-form-group">
                  <label>
                    Last Name<span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter your last name"
                    required
                  />
                  {errors.lastName && (
                    <p className="error-message">{errors.lastName}</p>
                  )}
                </div>
              </div>
              <div className="studentregister-row">
                <div className="studentregister-form-group">
                  <label>
                    Address 1<span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="address1"
                    value={formData.address1}
                    onChange={handleChange}
                    placeholder="Enter address line 1"
                    required
                  />
                  {errors.address1 && (
                    <p className="error-message">{errors.address1}</p>
                  )}
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
              </div>
              <div className="studentregister-row">
                <div className="signup-popup-form-group">
                  <label>
                    Country <span className="required">*</span>
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                  >
                    <option value="">Select Country</option>
                    {countries.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                  {errors.country && (
                    <p className="error-message">{errors.country}</p>
                  )}
                </div>
                <div className="studentregister-form-group">
                  <label>
                    ZIP<span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    placeholder="Enter ZIP code"
                    required
                  />
                  {errors.zip && <p className="error-message">{errors.zip}</p>}
                </div>
                <div className="studentregister-form-group">
                  <label>
                    State<span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Enter your state"
                    required
                  />
                  {errors.state && (
                    <p className="error-message">{errors.state}</p>
                  )}
                </div>
                <div className="studentregister-form-group">
                  <label>
                    City<span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter your city"
                    required
                  />
                  {errors.city && (
                    <p className="error-message">{errors.city}</p>
                  )}
                </div>
              </div>
              <div className="studentregister-form-group">
                <label>
                  Email<span className="required">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
                {errors.email && (
                  <p className="error-message">{errors.email}</p>
                )}
              </div>
              <div className="studentregister-row">
                <div className="studentregister-form-group">
                  <label>
                    Password<span className="required">*</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter a password"
                    required
                  />
                  {errors.password && (
                    <p className="error-message">{errors.password}</p>
                  )}
                </div>
                <div className="studentregister-form-group">
                  <label>
                    Confirm Password<span className="required">*</span>
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    required
                  />
                  {errors.confirmPassword && (
                    <p className="error-message">{errors.confirmPassword}</p>
                  )}
                </div>
              </div>
              <div className="studentregister-form-group">
                <label>
                  Contact Number<span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  placeholder="Enter your contact number"
                  required
                />
                {errors.contactNumber && (
                  <p className="error-message">{errors.contactNumber}</p>
                )}
              </div>
              <div className="studentregister-terms">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  required
                />
                <label>
                  I agree to the{" "}
                  <span
                    className="terms-link"
                    onClick={() => setIsPopupOpenTC(true)}
                  >
                    Terms and Conditions
                  </span>{" "}
                  of registration <span className="required">*</span>
                </label>
              </div>
              {errors.agreeToTerms && (
                <p className="error-message">{errors.agreeToTerms}</p>
              )}
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
        <StudentTermsAndConditions
          isPopupOpenTC={isPopupOpenTC}
          closePopupTC={() => setIsPopupOpenTC(false)}
        />
      </div>
    </>
  );
};

export default StudentRegisteration;
