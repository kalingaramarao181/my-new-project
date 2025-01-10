import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';
// import { baseUrl, baseUrlImg } from '../../config';
const baseUrl = ""
const DashboardContent = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get(`${baseUrl}issues`);
        setIssues(response.data.issues || []);
      } catch (error) {
        console.error('Error fetching issues:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  if (loading) {
    return <div className="loading">Loading issues...</div>;
  }

  return (
    <div className="dashboard-content">
      <h3 className="section-title">Students</h3>
      <div className="students-cards-container">
          <p>No students found.</p>
      </div>
    </div>
  );
};

// Helper Function for Status Color
const getStatusColor = (status) => {
  switch (status) {
    case 'To Do':
      return '#FF7F7F'; // Red
    case 'In Progress':
      return '#FFC107'; // Yellow
    case 'Done':
      return '#28A745'; // Green
    default:
      return '#6C757D'; // Gray
  }
};

export default DashboardContent;