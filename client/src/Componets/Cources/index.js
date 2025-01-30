import React, { useState, useEffect } from 'react';
import './index.css';
import { getCourses } from '../api';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (error) {
        console.error('Failed to load courses:', error);
      }
    };

    fetchCourses();

    const token = Cookies.get('token');
    setIsLoggedIn(!!token);
  }, []);

  const calculateDuration = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const diffInMonths =
      (endDate.getFullYear() - startDate.getFullYear()) * 12 +
      (endDate.getMonth() - startDate.getMonth());

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
    <div className="home-course">
      <h2>Available Courses</h2>
      <table className="home-course-table">
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Price</th>
            <th>Duration</th>
            <th>Teacher ID</th>
            <th>Batch</th>
            <th>Active</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.COURSE_ID}>
              <td>{course.COURSE_NAME}</td>
              <td>{course.PRICE}</td>
              <td>{calculateDuration(course.START_DT, course.END_DT)}</td>
              <td>{course.TEACHER_ID}</td>
              <td>{course.BATCH}</td>
              <td>{course.ACTIVE ? 'Yes' : 'No'}</td>
              <td><Link to={`/course-payment/${course.COURSE_ID}`}><button className="home-course-buy-btn">Enroll Now</button></Link></td>
            </tr>
          ))}
        </tbody>
      </table>
      {isLoggedIn && (
        <div className="courses-container">
          <h1>Courses</h1>
          <Link to="/dashboard"><button className="enrolled-courses-btn">Your Enrolled Courses</button></Link>
        </div>
      )}
    </div>
  );
};

export default Courses;
