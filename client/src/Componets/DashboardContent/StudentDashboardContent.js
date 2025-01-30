import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";
import { baseUrl } from "../config";
import { getEnrolledCourses } from "../api";

const StudentDashboardContent = ({ userId, userName }) => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch enrolled courses for the user
    const fetchEnrolledCourses = async () => {
      try {
        const response = await getEnrolledCourses(userId);
        setEnrolledCourses(response.data);
      } catch (error) {
        console.error("Error fetching enrolled courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, [userId]);

  const getDuration = (startDT, endDT) => {
    const startDate = new Date(startDT);
    const endDate = new Date(endDT);
    const diffInMonths =
      (endDate.getFullYear() - startDate.getFullYear()) * 12 +
      (endDate.getMonth() - startDate.getMonth());
    return diffInMonths;
  };

  return (
    <div className="student-dashboard-content">
      <h2 className="dashboard-heading">
        Hi, {userName}! You are enrolled in the following courses:
      </h2>

      {loading ? (
        <p className="loading-text">Loading courses...</p>
      ) : enrolledCourses.length === 0 ? (
        <p className="no-courses-text">No enrolled courses found.</p>
      ) : (
        <div className="grid">
          {enrolledCourses.map((course) => (
            <div key={course.ENROLLMENT_ID} className="course-card">
              {/* Course Image */}
              <img
                src="https://www.shutterstock.com/image-photo/young-woman-learning-language-during-600nw-1207740871.jpg"
                alt={course.COURSE_NAME}
                className="course-image"
              />

              {/* Course Details */}
              <div className="course-details">
                <h3 className="course-title">{course.COURSE_NAME}</h3>
                <p className="course-info">
                  <strong>Duration:</strong> {getDuration(course.START_DT, course.END_DT)} Months
                </p>
                <p className="course-info">
                  <strong>Start Time:</strong> {course.START_TIME} ({course.TIMEZONE})
                </p>
                <p className="course-info">
                  <strong>Price:</strong> ${course.PRICE}
                </p>
                <p className="course-info">
                  <strong>Batch:</strong> {course.BATCH}
                </p>
                <button className="course-details-btn">View Course Details</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentDashboardContent;
