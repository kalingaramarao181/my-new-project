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
import { getUser } from "../api";

const Dashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [userData, setUserData] = useState({});
  const [updatedUserData, setUpdatedUserData] = useState({});
  const [editField, setEditField] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
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

        const data = await getUser(userId);  // Use the getUser function
        console.log(data);

        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    setUpdatedUserData({
      ...updatedUserData,
      [e.target.name]: e.target.value,
    });
    setUserData({
      ...userData,
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
      if (editField === "PWD" && updatedUserData.PWD) {
        const response = await axios.put(`${baseUrl}users/${userId}`, {
          PWD: updatedUserData.PWD,
        });

        console.log("Password updated successfully", response.data);
      }

      // Reset edit field and clear the updated data after saving
      setUserData({ ...userData, PWD: updatedUserData.PWD });
      setUpdatedUserData({});
      setEditField(""); // Exit edit mode
    } catch (error) {
      console.error("Error updating user data:", error);
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
          <div className="user-profile-container">
            <div className="user-profile-header">
              <img
                className="user-photo"
                src={userData.documents?.photo}
                alt="User"
              />
              <h1>
                {userData.F_NAME} {userData.L_NAME}
              </h1>
              <p className="user-id">User ID: {userData.USER_ID}</p>
            </div>

            <div className="user-details user-card">
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
                      value={userData[field]}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span>
                      {field === "PWD" ? maskPassword(userData[field]) : userData[field]}
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

            <div className="user-documents user-card">
              <h2>Documents</h2>
              {Object.keys(userData.documents || {}).map((docKey) => (
                <div className="document-item" key={docKey}>
                  <label>{docKey.replace("_", " ").toUpperCase()}:</label>
                  <img
                    className="document-preview"
                    src={userData.documents[docKey]}
                    alt={docKey}
                  />
                  {userData.verified[docKey] ? (
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
