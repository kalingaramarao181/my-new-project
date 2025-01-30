// Dashboard/index.js
import React, { useState, useEffect } from "react";
import "./index.css";
import Sidebar from "../../Sidebar";
import { getUser } from "../../api";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import StudentCourseEnrollmentContent from "../../CourseEnrollmentContent/studentCourseEnrollmentContent";
import ParentCourseEnrollmentContent from "../../CourseEnrollmentContent/parentCourseEnrollmentContent";

const CourceEnrollment = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [userData, setUserData] = useState({});
  
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






  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const getCourseEnrollmentContent = () => {
    if (userData.MEMBER_TYPE_ID === 4) {
      return <StudentCourseEnrollmentContent userId={userData.MEMBER_ID} userName={userData.F_NAME + " " + userData.L_NAME} />;
    }
    if (userData.MEMBER_TYPE_ID === 3) {
      return <ParentCourseEnrollmentContent userId={userData.MEMBER_ID} userName={userData.F_NAME + " " + userData.L_NAME} />;
    }

  }

  return (
    <>
    <div className={`dashboard-page ${isCollapsed ? "sidebar-collapsed" : ""}`}>
      <Sidebar onToggleSidebar={toggleSidebar}  isCollapsed={isCollapsed} />
      <div className="main-content"> 
        {getCourseEnrollmentContent()}
      </div>
      
      </div>
    </>
  );
};

export default CourceEnrollment;