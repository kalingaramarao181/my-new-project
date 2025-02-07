import React, { useState, useEffect } from "react";
import { getCourses, getRefferedStudents } from "../api";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import "./index.css";
import CourseDetails from "../Popups/CourseDetailsPopup";

const ParentCourseEnrollmentContent = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [courseId, setCourseId] = useState(null);
  const [isOpenCourseDetails, setIsOpenCourseDetails] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const decodedToken = jwtDecode(Cookies.get("token"));
    const userId = decodedToken.userId;
    const fetchStudentsAndCourses = async () => {
      try {
        const studentsData = await getRefferedStudents(userId);
        setStudents(studentsData);
        const coursesData = await getCourses();
        setCourses(coursesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchStudentsAndCourses();
  }, []);

  const handleAddCourse = (courseId) => {
    if (!courseId) return;

    const courseObj = courses.find((course) => course.COURSE_ID === parseInt(courseId));
    if (courseObj && !selectedCourses.some((c) => c.courseId === courseObj.COURSE_ID)) {
      setSelectedCourses([...selectedCourses, { courseId: courseObj.COURSE_ID, courseName: courseObj.COURSE_NAME }]);
    }
  };

  const handleRemoveCourse = (courseId) => {
    setSelectedCourses(selectedCourses.filter((course) => course.courseId !== courseId));
  };

  const handleCourseClick = (courseId) => {
    setCourseId(courseId);
    setIsOpenCourseDetails(true);
  };

  const handleSubmit = () => {
    navigate("/payment", { state: { selectedStudent, selectedCourses } });
  };

  return (
    <>
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
                {students.map((student) => (
                  <option key={student.id} value={student.id}>
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
                {courses.map((course) => (
                  <option key={course.COURSE_ID} value={course.COURSE_ID}>
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
                {selectedCourses.map((course) => (
                  <li key={course.courseId} className="course-course-item">
                    <span
                      className="course-course-name"
                      onClick={() => handleCourseClick(course.courseId)}
                    >
                      {course.courseName}
                    </span>
                    <button
                      className="course-remove-button"
                      onClick={() => handleRemoveCourse(course.courseId)}
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

      {/* Course Details Popup */}
      {isOpenCourseDetails && (
        <CourseDetails
          isOpenCourseDetails={isOpenCourseDetails}
          closeCourseDetails={() => setIsOpenCourseDetails(false)}
          courseId={courseId}
        />
      )}
    </>
  );
};

export default ParentCourseEnrollmentContent;
