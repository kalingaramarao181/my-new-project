// Dashboard/index.js
import React, { useState } from "react";
import "./index.css";
import Sidebar from "../../Sidebar";
import { getLocationData, signupUser } from "../../api";
import { formValidation } from "../../formValidation";
import { countries } from "../../countries";

const VolunteerRegistration = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
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
    password: "",
    memberType: 5,
    confirmPassword: "",
    contactNumber: "",
    agreeToTerms: false,
    volunteerType: "",
    subject: "",
    about: "",
    roleId: 5,
    country: "",
  });

  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = async (e) => {
    const { name, value, type, checked } = e.target;

    const newFormData = {
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    };

    setFormData(newFormData);

    if (name === "zip" && newFormData.country) {
      const country = newFormData.country;
      const zip = value;

      if (country === "IN" && !/^\d{6}$/.test(zip)) {
        setErrors({ zip: "Indian PIN code must be exactly 6 digits." });
        return;
      }
      if (country === "US" && !/^\d{5}$/.test(zip)) {
        setErrors({ zip: "US ZIP code must be exactly 5 digits." });
        return;
      }

      const locationData = await getLocationData(
        country,
        zip,
        newFormData.city,
        newFormData.state
      );

      if (locationData.error) {
        setErrors({ zip: locationData.error });
        console.error("Location data error:", locationData.error);
      } else {
        setFormData({
          ...newFormData,
          city: locationData.city || newFormData.city,
          state: locationData.state || newFormData.state,
        });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = await formValidation(formData);
    console.log("Form Errors: ", formErrors);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const requestData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      title: formData.title,
      address1: formData.address1,
      address2: formData.address2,
      city: formData.city,
      state: formData.state,
      zip: formData.zip,
      email: formData.email,
      mobile: formData.contactNumber,
      volunteerType: formData.volunteerType,
      subject: formData.subject,
      about: formData.about,
      memberType: formData.memberType,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
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
          volunteerType: "",
          subject: "",
          about: "",
          agreeToTerms: false,
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
          <div className="volunteer-registration-container">
            <h1 className="volunteer-registration-title">
              Volunteer Registration
            </h1>
            <form
              className="volunteer-registration-form"
              onSubmit={handleSubmit}
            >
              <div className="volunteer-registration-row">
                <div className="volunteer-registration-form-group1">
                  <label>
                    Title <span className="required">*</span>
                  </label>
                  <select
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                  >
                    <option value="Male">Mr.</option>
                    <option value="Female">Ms.</option>
                  </select>
                  {errors.title && (
                    <p className="error-message">{errors.title}</p>
                  )}
                </div>
                <div className="volunteer-registration-form-group">
                  <label>
                    First Name <span className="required">*</span>
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
                <div className="volunteer-registration-form-group">
                  <label>
                    Last Name <span className="required">*</span>
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
                <div className="volunteer-registration-form-group">
                  <label>
                    Date of Birth <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    placeholder="MM-DD-YYYY"
                    required
                  />
                  {errors.lastName && (
                    <p className="error-message">{errors.lastName}</p>
                  )}
                </div>
              </div>
              <div className="volunteer-registration-row">
                <div className="volunteer-registration-form-group">
                  <label>
                    Address 1 <span className="required">*</span>
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
                <div className="volunteer-registration-form-group">
                  <label>Address 2</label>
                  <input
                    type="text"
                    name="address2"
                    value={formData.address2}
                    onChange={handleChange}
                    placeholder="Enter address line 2"
                  />
                  {errors.city && (
                    <p className="error-message">{errors.city}</p>
                  )}
                </div>
              </div>
              <div className="volunteer-registration-row">
                <div className="volunteer-registration-form-group">
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
                <div className="volunteer-registration-form-group">
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
                </div>
                <div className="volunteer-registration-form-group">
                  <label>
                    State <span className="required">*</span>
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
                <div className="volunteer-registration-form-group">
                  <label>
                    City <span className="required">*</span>
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
              <div className="volunteer-registration-row">
                <div className="volunteer-registration-form-group">
                  <label>
                    Email (
                    <span className="tooltip">
                      This is your sosaal Login ID
                    </span>
                    ) <span className="required">*</span>
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
                  {errors.contactNumber && (
                    <p className="error-message">{errors.contactNumber}</p>
                  )}
                </div>
                <div className="volunteer-registration-form-group">
                  <label>
                    Password <span className="required">*</span>
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
                <div className="volunteer-registration-form-group">
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

              <div className="volunteer-registration-row">
                <div className="volunteer-registration-form-group">
                  <label>
                    Volunteer Type <span className="required">*</span>
                  </label>
                  <select
                    onChange={handleChange}
                    value={formData.volunteerType}
                    name="volunteerType"
                    required
                  >
                    <option value="">Select Volunteer Type</option>
                    <option value="teacher">Teacher</option>
                    <option value="teachingAssistant">
                      Teaching Assistant
                    </option>
                    <option value="backOffice">Back Office</option>
                    <option value="others">Others</option>
                  </select>
                  {errors.volunteerType && (
                    <p className="error-message">{errors.volunteerType}</p>
                  )}
                </div>

                <div className="volunteer-registration-form-group">
                  <label>
                    Subject <span className="required">*</span>
                  </label>
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
                    <option value="financialEducation">
                      Financial Education
                    </option>
                  </select>
                  {errors.subject && (
                    <p className="error-message">{errors.subject}</p>
                  )}
                </div>
              </div>
              <div className="volunteer-registration-terms">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  required
                />
                {errors.agreeToTerms && (
                  <p className="error-message">{errors.agreeToTerms}</p>
                )}
                <label>
                  I agree to the Terms and Conditions of registration
                </label>
              </div>
              <button
                className="volunteer-registration-submit-btn"
                type="submit"
              >
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
