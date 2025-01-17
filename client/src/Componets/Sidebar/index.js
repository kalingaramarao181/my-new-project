import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaProjectDiagram } from "react-icons/fa";
import { TbReportAnalytics } from "react-icons/tb";
import { FaRegCalendarAlt } from "react-icons/fa";
import { TiGroupOutline } from "react-icons/ti";
import { PiStudentBold } from "react-icons/pi";
import "./index.css";

const Sidebar = ({ onToggleSidebar, isCollapsed }) => {
  const location = useLocation();

  return (
    <div className={`sidebar-container ${isCollapsed ? "sidebar-collapsed" : ""}`}> 
      <div className="sidebar-header-container">
        <button className="sidebar-toggle-btn" onClick={onToggleSidebar}>
          {isCollapsed ? "»" : "«"}
        </button>
      </div>
      <nav className="sidebar-navigation">
        <ul className="sidebar-menu">
          <li className={`sidebar-menu-item ${location.pathname === "/student-reg" ? "active" : ""}`}>
            <Link className="sidebar-menu-link" to="/student-reg">
              <PiStudentBold className="sidebar-icon" />
              <span className="sidebar-label">Students Registeration</span>
            </Link>
          </li>
          <li className={`sidebar-menu-item ${location.pathname === "/course-enm" ? "active" : ""}`}>
            <Link className="sidebar-menu-link" to="/course-enm">
              <FaProjectDiagram className="sidebar-icon" /> 
              <span className="sidebar-label">Cource Enrollment</span>
            </Link>
          </li>
          <li className={`sidebar-menu-item ${location.pathname === "/attendance" ? "active" : ""}`}>
            <Link className="sidebar-menu-link" to="/attendance">
              <FaRegCalendarAlt className="sidebar-icon" />
              <span className="sidebar-label">Attendance Tracking</span>
            </Link>
          </li>
          <li className={`sidebar-menu-item ${location.pathname === "/course-management" ? "active" : ""}`}>
            <Link className="sidebar-menu-link" to="/course-management">
              <TbReportAnalytics className="sidebar-icon" />
              <span className="sidebar-label">Course Management</span>
            </Link>
          </li>
          <li className={`sidebar-menu-item ${location.pathname === "/volunteer-reg" ? "active" : ""}`}>
            <Link className="sidebar-menu-link" to="/volunteer-reg">
              <TiGroupOutline className="sidebar-icon" />
              <span className="sidebar-label">Volenteers</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;