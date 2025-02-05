import React, { useState, useEffect } from "react";
import { getCourses, getStudents } from "../api";
import { useNavigate } from "react-router-dom";
import "./index.css";

const ParentCourseEnrollmentContent = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentsAndCourses = async () => {
      try {
        const studentsData = await getStudents();
        setStudents(studentsData);
        const coursesData = await getCourses();
        setCourses(coursesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchStudentsAndCourses();
  }, []);

  const handleAddCourse = (courseName) => {
    if (courseName && !selectedCourses.includes(courseName)) {
      setSelectedCourses([...selectedCourses, courseName]);
    }
  };

  const handleRemoveCourse = (courseName) => {
    setSelectedCourses(
      selectedCourses.filter((course) => course !== courseName)
    );
  };

  const handleSubmit = () => {
    navigate("/payment", { state: { selectedStudent, selectedCourses } });
  };

  return (
    <div className="course-container">
      <h1>Course Enrollment</h1>
      <div className="course-form-row">
        <div className="course-form-main-group">
        <div className="course-form-group">
          <label htmlFor="student">Select Student:</label>
          <select
            id="student"
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
            className="course-dropdown"
          >
            <option value="">Select a student</option>
            {students.map((student, index) => (
              <option key={index} value={student.id}>
                {student.name}
              </option>
            ))}
          </select>
        </div>

        <div className="course-form-group">
          <label htmlFor="course">Available Courses:</label>
          <select
            id="course"
            onChange={(e) => handleAddCourse(e.target.value)}
            className="course-dropdown"
          >
            <option value="">Select a course</option>
            {courses.map((course, index) => (
              <option key={index} value={course.name}>
                {course.COURSE_NAME} - ${course.PRICE}
              </option>
            ))}
          </select>
        </div>
        </div>

        {selectedCourses.length > 0 && (
          <div className="course-selected-courses">
            <h3>Selected Courses:</h3>
            <ul>
              {selectedCourses.map((course, index) => (
                <li key={index} className="course-course-item">
                  {course}
                  <button
                    className="course-remove-button"
                    onClick={() => handleRemoveCourse(course)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <button
        className="course-submit-button"
        onClick={handleSubmit}
        disabled={!selectedStudent || selectedCourses.length === 0}
      >
        Proceed to Payment
      </button>
    </div>
  );
};

export default ParentCourseEnrollmentContent;
