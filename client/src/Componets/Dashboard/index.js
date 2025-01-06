// Dashboard/index.js
import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import DashboardContent from "../Dashboard/DashboardContent";
import "./index.css";

const Dashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Handlers for popup
  const togglePopup = () => setIsPopupOpen(!isPopupOpen);

  // Toggle Sidebar
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
    <div className={`dashboard-page ${isCollapsed ? "sidebar-collapsed" : ""}`}>
      <Sidebar onToggleSidebar={toggleSidebar}  isCollapsed={isCollapsed} />
      <div className="main-content">
        <DashboardContent />
      </div>
    </div>
    </>
  );
};

export default Dashboard;