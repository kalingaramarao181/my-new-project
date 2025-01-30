import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import Sidebar from "../Sidebar";
import "./index.css";
import axios from "axios";
import { baseUrl } from "../config";
import { getUser } from "../api";
import StudentDashboardContent from "../DashboardContent/StudentDashboardContent";
import ParentDashboardContent from "../DashboardContent/ParentDashboardContent";

const Dashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [userData, setUserData] = useState({});

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



  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const getContentByRole = () => {  
    console.log(userData.roleId);
    
    if (userData.MEMBER_TYPE_ID === 4) {
      return <StudentDashboardContent userId={userData.MEMBER_ID} userName={userData.F_NAME + " " + userData.L_NAME} />;
      } 
      else if (userData.MEMBER_TYPE_ID === 3) {
        return <ParentDashboardContent userId={userData.MEMBER_ID} userName={userData.F_NAME + " " + userData.L_NAME} />;
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
