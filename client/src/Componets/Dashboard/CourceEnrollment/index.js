// Dashboard/index.js
import React, { useState } from "react";
import "./index.css";
import Sidebar from "../../Sidebar";

const CourceEnrollment = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);

  const courses = [
    { name: 'Introduction to Programming', price: 299.99 },
    { name: 'Web Development Fundamentals', price: 349.99 },
    { name: 'Data Science Basics', price: 399.99 },
    { name: 'Mobile App Development', price: 449.99 },
    { name: 'Artificial Intelligence', price: 499.99 },
  ];

  const handleAddCourse = (course) => {
    if (!selectedCourses.includes(course)) {
      setSelectedCourses([...selectedCourses, course]);
    }
  };

  const handleRemoveCourse = (course) => {
    setSelectedCourses(selectedCourses.filter((item) => item !== course));
  };

  const handleSubmit = () => {
    console.log({
      selectedStudent,
      selectedCourses,
    });
    setSelectedStudent('');
    setSelectedCourses([]);
    setPopupVisible(true);
    setTimeout(() => setPopupVisible(false), 2000);
  };


  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
    <div className={`dashboard-page ${isCollapsed ? "sidebar-collapsed" : ""}`}>
      <Sidebar onToggleSidebar={toggleSidebar}  isCollapsed={isCollapsed} />
      <div className="main-content">
      <div className="Course-container">
        <h1>Course Enrollment</h1>
        <div className="Course-form-group">
          <label htmlFor="student">Student:</label>
          <select
            id="student"
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
            className="Course-dropdown"
          >
            <option value="">Select a student</option>
            <option value="Student 1">Student 1</option>
            <option value="Student 2">Student 2</option>
            <option value="Student 3">Student 3</option>
          </select>
        </div>

        <div className="Course-form-group">
          <label htmlFor="course">Available Courses:</label>
          <select
            id="course"
            onChange={(e) => handleAddCourse(e.target.value)}
            className="Course-dropdown"
          >
            <option value="">Select a course</option>
            {courses.map((course, index) => (
              <option key={index} value={course.name}>
                {course.name} - ${course.price.toFixed(2)}
              </option>
            ))}
          </select>
        </div>

        {selectedCourses.length > 0 && (
          <div className="Course-selected-courses">
            <h3>Selected Courses:</h3>
            <ul>
              {selectedCourses.map((course, index) => (
                <li key={index} className="Course-course-item">
                  {course}
                  <button
                    className="Course-remove-button"
                    onClick={() => handleRemoveCourse(course)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          className="Course-submit-button"
          onClick={handleSubmit}
          disabled={!selectedStudent || selectedCourses.length === 0}
        >
          Proceed to Payment
        </button>

        {popupVisible && (
          <div className="Course-popup">
            <div className="Course-popup-content">
              <h2>Successfully Submitted!</h2>
            </div>
          </div>
        )}
      </div>
    </div>
      </div>
    </>
  );
};

export default CourceEnrollment;