import React, { useState, useEffect } from 'react';
import { getParentChildrenEnrolledCourses } from '../api';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';

const ParentDashboardContent = () => {
  const [parentId, setParentId] = useState('');
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
        setParentId(data.parentId);
        setStudents(data.students);
      } catch (error) {
        console.error('Error fetching parent children courses:', error);
      }
    };

    fetchParentChildrenCourses();
  }, []);

  return (
    <div className="parent-dashboard-content">
      <h1>Hi Parent,</h1>
      {students.map((student, index) => (
        <div key={index} className="student-courses">
          <h2>Your {student.gender === 'Male' ? 'son' : 'daughter'} {student.studentName} enrolled courses:</h2>
          <ul>
            {student.enrolledCourses.map((course, idx) => (
              <li key={idx}>
                <p>Course Name: {course.courseName}</p>
                <p>Teacher: {course.teacher}</p>
                <p>Start Date: {course.startDate}</p>
                <p>End Date: {course.endDate}</p>
                <p>Start Time: {course.startTime}</p>
                <p>End Time: {course.endTime}</p>
                <p>Timezone: {course.timezone}</p>
                <p>Price: ${course.price}</p>
                <p>Batch: {course.batch}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ParentDashboardContent;
