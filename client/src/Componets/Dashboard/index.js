import React, { useState, useEffect } from "react";
import Cookies from "js-cookie"; // For managing cookies
import { jwtDecode } from "jwt-decode"; // For decoding JWT tokens
import Sidebar from "../Sidebar";
import "./index.css";
import { MdEdit } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { IoIosCheckmarkCircle } from "react-icons/io";
import axios from "axios";
import { baseUrl } from "../config";

const Dashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [studentData, setStudentData] = useState({});
  const [updatedStudentData, setUpdatedStudentData] = useState({});
  const [editField, setEditField] = useState("");

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) {
          throw new Error("No token found");
        }

        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;

        if (!userId) {
          throw new Error("User ID not found in token");
        }

        const response = await axios.get(`${baseUrl}users/${userId}`);
        console.log(response.data);

        setStudentData(response.data);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchStudentData();
  }, []);

  const handleInputChange = (e) => {
    setUpdatedStudentData({
      ...updatedStudentData,
      [e.target.name]: e.target.value,
    });
    setStudentData({
      ...studentData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle saving data
  const handleSave = async () => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        throw new Error("No token found");
      }

      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;

      if (!userId) {
        throw new Error("User ID not found in token");
      }

      // If only the password is updated, send only the password
      if (editField === "PWD" && updatedStudentData.PWD) {
        const response = await axios.put(`${baseUrl}users/${userId}`, {
          PWD: updatedStudentData.PWD,
        });

        console.log("Password updated successfully", response.data);
      }

      // Reset edit field and clear the updated data after saving
      setStudentData({ ...studentData, PWD: updatedStudentData.PWD });
      setUpdatedStudentData({});
      setEditField(""); // Exit edit mode
    } catch (error) {
      console.error("Error updating student data:", error);
    }
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Updated maskPassword function to check for undefined
  const maskPassword = (password) => {
    if (!password) return ""; // Return empty string if password is undefined or null
    return "*".repeat(password.length > 5 ? 5 : password.length); // Display up to 5 stars
  };

  return (
    <>
      <div className={`dashboard-page ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <Sidebar onToggleSidebar={toggleSidebar} isCollapsed={isCollapsed} />
        <div className="main-content">
          <div className="student-profile-container">
            <div className="student-profile-header">
              <img
                className="student-photo"
                src={studentData.documents?.photo}
                alt="Student"
              />
              <h1>
                {studentData.F_NAME} {studentData.L_NAME}
              </h1>
              <p className="student-id">Student ID: {studentData.USER_ID}</p>
            </div>

            <div className="student-details student-card">
              <h2>Personal Details</h2>
              {[
                "F_NAME",
                "L_NAME",
                "EMAIL",
                "MOBILE",
                "ADD1",
                "STATE",
                "CITY",
                "ZIP",
                "PWD", // Keep "PWD" for password masking
              ].map((field, index) => (
                <div className="details-item" key={index}>
                  <label>{field.replace("_", " ").toUpperCase()}:</label>
                  {editField === field ? (
                    <input
                      name={field}
                      value={studentData[field]}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span>
                      {field === "PWD" ? maskPassword(studentData[field]) : studentData[field]}
                    </span>
                  )}
                  {editField === field ? (
                    <TiTick className="edit-icon" onClick={handleSave} />
                  ) : (
                    <MdEdit
                      className="edit-icon"
                      onClick={() => setEditField(field)}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="student-documents student-card">
              <h2>Documents</h2>
              {Object.keys(studentData.documents || {}).map((docKey) => (
                <div className="document-item" key={docKey}>
                  <label>{docKey.replace("_", " ").toUpperCase()}:</label>
                  <img
                    className="document-preview"
                    src={studentData.documents[docKey]}
                    alt={docKey}
                  />
                  {studentData.verified[docKey] ? (
                    <IoIosCheckmarkCircle className="verified-icon" />
                  ) : (
                    <span className="unverified-text">Pending</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
