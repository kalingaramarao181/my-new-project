import React, { useState, useEffect } from 'react';
import { getParentChildrenEnrolledCourses } from '../api';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';

const ParentDashboardContent = ({ userId, userName }) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchParentChildrenCourses = async () => {
      try {
        const token = Cookies.get('token');
        if (!token) throw new Error('No token found');

        const decodedToken = jwtDecode(token);
        const parentId = decodedToken.userId;
        if (!parentId) throw new Error('Parent ID not found in token');

        const data = await getParentChildrenEnrolledCourses(parentId);
        setStudents(data.students || []);
      } catch (error) {
        console.error('Error fetching parent children courses:', error);
      }
    };

    fetchParentChildrenCourses();
  }, []);

  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffInMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());

    if (diffInMonths >= 12) {
      const years = Math.floor(diffInMonths / 12);
      const remainingMonths = diffInMonths % 12;
      return remainingMonths > 0
        ? `${years} year${years > 1 ? 's' : ''} ${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`
        : `${years} year${years > 1 ? 's' : ''}`;
    }

    return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''}`;
  };

  return (
    <div className="parent-dashboard-content">
      <h1>Hi {userName},</h1>
      {students.length > 0 ? (
        students.map((student, index) => (
          <div key={index} className="student-courses">
            <h2>Your {student.gender === 'Male' ? 'Son' : 'Daughter'} {student.studentName} Enrolled Courses:</h2>
            <table className="dashboard-course-table">
              <thead>
                <tr>
                  <th>Course Name</th>
                  <th>Teacher</th>
                  <th>Timezone</th>
                  <th>Batch</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                {student.enrolledCourses.map((course, idx) => (
                  <tr key={idx}>
                    <td>{course.courseName}</td>
                    <td>{course.teacher}</td>
                    <td>{course.timezone}</td>
                    <td>{course.batch}</td>
                    <td>{calculateDuration(course.startDate, course.endDate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      ) : (
        <p>No enrolled courses found.</p>
      )}
    </div>
  );
};

export default ParentDashboardContent;
