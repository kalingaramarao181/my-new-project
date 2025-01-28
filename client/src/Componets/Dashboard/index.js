import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import Sidebar from "../Sidebar";
import "./index.css";
import axios from "axios";
import { baseUrl } from "../config";
import { getUser } from "../api";
import StudentDashboardContent from "../DashboardContent/StudentDashboardContent";

const Dashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [userData, setUserData] = useState({});
  const [updatedUserData, setUpdatedUserData] = useState({});
  const [editField, setEditField] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) throw new Error("No token found")

        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;
        if (!userId) throw new Error("User ID not found in token")

        const data = await getUser(userId);
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error)
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

      const response = await axios.put(`${baseUrl}users/${userId}`, updatedData);
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

  const getContentByRole = () => {  
    console.log(userData.roleId);
    
    if (userData.MEMBER_TYPE_ID === 4) {
      return <StudentDashboardContent userId={userData.MEMBER_ID} userName={userData.F_NAME + " " + userData.L_NAME} />;
      } 
    }
        

  return (
    <>
      <div className={`dashboard-page ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <Sidebar onToggleSidebar={toggleSidebar} isCollapsed={isCollapsed} />
        <div className="main-content">
          <div className="user-profile-container">
              {getContentByRole()}
            </div>
          </div>
        </div>
    </>
  );
};

export default Dashboard;
