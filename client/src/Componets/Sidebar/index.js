import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaProjectDiagram } from "react-icons/fa";
import { TbReportAnalytics } from "react-icons/tb";
import { FaRegCalendarAlt } from "react-icons/fa";
import { TiGroupOutline } from "react-icons/ti";
import { PiStudentBold } from "react-icons/pi";
import { ImProfile } from "react-icons/im";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import "./index.css";
import { userRoleResources } from "../api";

const Sidebar = ({ onToggleSidebar, isCollapsed }) => {
  const [accessibleRoutes, setAccessibleRoutes] = useState([]);
  const location = useLocation();
  const token = Cookies.get("token");

  const resourceToPath = {
    "Student Registration": "/student-reg",
    "Course Enrollment": "/course-enm",
    "Attendance": "/attendance",
    "Course Management": "/course-management",
    "Volunteers": "/volunteer-reg",
    "Dashboard": "/dashboard",
    "Profile": "/profile"
  };

  const resources = [
    { name: "Dashboard", icon: <TbReportAnalytics className="sidebar-icon" /> },
    { name: "Student Registration", icon: <PiStudentBold className="sidebar-icon" /> },
    { name: "Course Enrollment", icon: <FaProjectDiagram className="sidebar-icon" /> },
    { name: "Attendance", icon: <FaRegCalendarAlt className="sidebar-icon" /> },
    { name: "Course Management", icon: <TbReportAnalytics className="sidebar-icon" /> },
    { name: "Volunteers", icon: <TiGroupOutline className="sidebar-icon" /> },
    { name: "Profile", icon: <ImProfile className="sidebar-icon" /> },
  ];


  useEffect(() => {
    if (!token) return;

    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;

    const fetchUserResources = async () => {
      try {
        const userResources = await userRoleResources(userId);
        
        const userPaths = userResources
          .map((resource) => resourceToPath[resource])
          .filter((path) => path);

        setAccessibleRoutes(userPaths);
      } catch (error) {
        console.error("Error fetching user resources:", error);
      }
    };

    fetchUserResources();
  }, [token, location.pathname]);

  return (
    <div className={`sidebar-container ${isCollapsed ? "sidebar-collapsed" : ""}`}>
      <div className="sidebar-header-container">
        <button className="sidebar-toggle-btn" onClick={onToggleSidebar}>
          {isCollapsed ? "»" : "«"}
        </button>
      </div>
      <nav className="sidebar-navigation">
        <ul className="sidebar-menu">
          {resources.map((resource) => {
            const path = resourceToPath[resource.name];
            if (accessibleRoutes.includes(path)) {
              return (
                <li key={resource.name} className={`sidebar-menu-item ${location.pathname === path ? "active" : ""}`}>
                  <Link className="sidebar-menu-link" to={path}>
                    {resource.icon}
                    <span className="sidebar-label">{resource.name}</span>
                  </Link>
                </li>
              );
            }
            return null; 
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
