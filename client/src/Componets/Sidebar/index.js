import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { FaProjectDiagram } from "react-icons/fa";
import { SiTask } from "react-icons/si";
import { TbReportAnalytics } from "react-icons/tb";
import { MdSettingsSuggest } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import { TiGroupOutline } from "react-icons/ti";

import { PiStudentBold } from "react-icons/pi";
import "./index.css";

const Sidebar = ({ onToggleSidebar, isCollapsed }) => {
  const location = useLocation();

  return (
    <div className={`sidebar-container ${isCollapsed ? "sidebar-collapsed" : ""}`}>
      <div className="sidebar-header-container">
        {!isCollapsed && <h3 className="sidebar-title"></h3>}
        <button className="sidebar-toggle-btn" onClick={onToggleSidebar}>
          {isCollapsed ? "»" : "«"}
        </button>
      </div>
      <nav className="sidebar-navigation">
        <ul className="sidebar-menu">
          <li className={`sidebar-menu-item ${location.pathname === "/dashboard" ? "active" : ""}`}>
            <Link className="sidebar-menu-link" to="/dashboard">
              <PiStudentBold className="sidebar-icon" />
              <span className="sidebar-label">Students</span>
            </Link>
          </li>
          <li className={`sidebar-menu-item ${location.pathname === "/projects" ? "active" : ""}`}>
            <Link className="sidebar-menu-link" to="/dashboard">
              <FaProjectDiagram className="sidebar-icon" />
              <span className="sidebar-label">Cource Enrollment</span>
            </Link>
          </li>
          <li className={`sidebar-menu-item ${location.pathname === "/tasks" ? "active" : ""}`}>
            <Link className="sidebar-menu-link" to="/dashboard">
              {/* <SiTask className="sidebar-icon" /> */}
              <FaRegCalendarAlt className="sidebar-icon" />
              <span className="sidebar-label">Attendance Tracking</span>
            </Link>
          </li>
          <li className={`sidebar-menu-item ${location.pathname === "/reports" ? "active" : ""}`}>
            <Link className="sidebar-menu-link" to="/dashboard">
              <TbReportAnalytics className="sidebar-icon" />
              <span className="sidebar-label">Cources</span>
            </Link>
          </li>
          <li className={`sidebar-menu-item ${location.pathname === "/timesheets" ? "active" : ""}`}>
            <Link className="sidebar-menu-link" to="/dashboard">
              <TiGroupOutline className="sidebar-icon" />
              <span className="sidebar-label">Volenteers</span>
            </Link>
          </li>
          <li className={`sidebar-menu-item ${location.pathname === "/settings" ? "active" : ""}`}>
            <Link className="sidebar-menu-link" to="/dashboard">
              <MdSettingsSuggest className="sidebar-icon" />
              <span className="sidebar-label">Settings</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;