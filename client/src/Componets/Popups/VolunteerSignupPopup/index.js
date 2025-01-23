import React, { useState } from "react";
import Popup from "reactjs-popup";
import "./index.css";
import VolunteerTermsAndConditions from "../VolunteerTermsAndConditions";
import { signupUser } from "../../api";

const VolunteerSignupPopup = ({
  isPopupOpenVolunteerSignup,
  closePopupVolunteerSignup,
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
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
    memberType: 5,
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [isPopupOpenVolunteerTC, setIsPopupOpenVolunteerTC] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.firstName.trim())
      formErrors.firstName = "First name is required.";
    if (!formData.lastName.trim())
      formErrors.lastName = "Last name is required.";
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
    if (!formData.volunteerType.trim())
      formErrors.volunteerType = "Volunteer type is required.";
    if (!formData.subject.trim()) formErrors.subject = "Subject is required.";
    if (!formData.about.trim()) formErrors.about = "About is required.";
    if (!formData.agreeToTerms)
      formErrors.agreeToTerms = "You must agree to the terms and conditions.";
    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    console.log("Form Errors: ", formErrors);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const requestData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
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

  return (
    <Popup
      open={isPopupOpenVolunteerSignup}
      onClose={closePopupVolunteerSignup}
      modal
      nested
      contentStyle={{ zIndex: 1100, borderRadius: "12px", padding: "20px" }}
      overlayStyle={{ zIndex: 1100, backgroundColor: "rgba(0, 0, 0, 0.6)" }}
    >
      <div className="signup-popup-container">
        <button
          className="signup-popup-close-btn"
          onClick={closePopupVolunteerSignup}
        >
          &times;
        </button>
        <h1 className="signup-popup-title">Volunteer Registration</h1>
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
          <div className="signup-popup-form-group">
            <label>
              Volunteer Type <span className="required">*</span>
            </label>
            <select
              onChange={handleChange}
              value={formData.volunteerType}
              name="volunteerType"
            >
              <option value="">Select Volunteer Type</option>
              <option value="teacher">Teacher</option>
              <option value="teachingAssistant">Teaching Assistant</option>
              <option value="backOffice">Back Office</option>
              <option value="others">Others</option>
            </select>
            {errors.volunteerType && (
              <p className="error-message">{errors.volunteerType}</p>
            )}
          </div>

          <div className="signup-popup-form-group">
            <label>
              Subject <span className="required">*</span>
            </label>
            <select
              onChange={handleChange}
              value={formData.subject}
              name="subject"
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
            {errors.subject && (
              <p className="error-message">{errors.subject}</p>
            )}
          </div>
          <div className="signup-popup-form-group">
            <label>
              About you and your interests <span className="required">*</span>
            </label>
            <textarea
              type="text"
              name="about"
              value={formData.about}
              onChange={handleChange}
              placeholder="Tell us about yourself and why you are intrested in volunteering. What skills are experiences can you bring to our organization?"
            />
            {errors.about && <p className="error-message">{errors.about}</p>}
          </div>
          <div className="signup-popup-terms">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
            />
            <label>
              I agree to the{" "}
              <span
                className="terms-link"
                onClick={() => setIsPopupOpenVolunteerTC(true)}
              >
                Terms and Conditions
              </span>{" "}
              of registration
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
      <VolunteerTermsAndConditions
        isPopupOpenTC={isPopupOpenVolunteerTC}
        closePopupTC={() => setIsPopupOpenVolunteerTC(false)}
      />
    </Popup>
  );
};

export default VolunteerSignupPopup;
