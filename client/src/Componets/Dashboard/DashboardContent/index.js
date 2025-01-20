import React from 'react';
import './index.css';
// import { baseUrl, baseUrlImg } from '../../config';
const DashboardContent = () => {
  return (
    <div className="dashboard-content">
      <h3 className="section-title">Students</h3>
      <div className="students-cards-container">
          <p>No students found.</p>
      </div>
    </div>
  );
};

export default DashboardContent;