import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import Sidebar from "../../Sidebar";
import "./index.css";
import { MdEdit } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { getUser, updateUser } from "../../api";

const Profile = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [userData, setUserData] = useState({});
  const [updatedUserData, setUpdatedUserData] = useState({});
  const [editField, setEditField] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) throw new Error("No token found");

        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;
        if (!userId) throw new Error("User ID not found in token");

        const data = await getUser(userId);
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

  const handleSave = async () => {
    try {
      const token = Cookies.get("token");
      if (!token) throw new Error("No token found");

      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      if (!userId) throw new Error("User ID not found in token");

      const updatedData = { [editField]: updatedUserData[editField] };

      const response = await updateUser(userId, updatedData);
      console.log("Field updated successfully", response.data);

      setUserData({ ...userData, ...updatedData });
      setUpdatedUserData({});
      setEditField("");
      setShowPopup(false);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const maskPassword = (password) => {
    if (!password) return "";
    return "*".repeat(password.length > 5 ? 5 : password.length);
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
                src={
                  userData.documents?.photo ||
                  "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
                }
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
                    <TiTick
                      className="edit-icon"
                      onClick={() => setShowPopup(true)}
                    />
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

      {showPopup && (
        <div className="user-dashboard-popup">
          <div className="user-dashboard-popup-content">
            <h3>Are you sure you want to update {editField.replace("_", " ")}?</h3>
            <div className="user-dashboard-popup-actions">
              <button className="btn-save" onClick={handleSave}>
                Save
              </button>
              <button
                className="btn-cancel"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
