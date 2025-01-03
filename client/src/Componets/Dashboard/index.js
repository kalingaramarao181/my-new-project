// Dashboard/index.js
import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import DashboardContent from "../Dashboard/DashboardContent";
import "./index.css";
import DashboardNav from "../DashboardNav";
import Header from "../header";

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
    <Header />
    <div className={`dashboard-page ${isCollapsed ? "sidebar-collapsed" : ""}`}>
      <Sidebar onToggleSidebar={toggleSidebar}  isCollapsed={isCollapsed} />
      <div className="main-content">
        {/* <DashboardNav openPopup={togglePopup} closePopup={() => setIsPopupOpen(false)} isPopupOpen={isPopupOpen} /> */}
        <DashboardContent />
      </div>
    </div>
    </>
  );
};

export default Dashboard;