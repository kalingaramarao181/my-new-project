import React, { useState, useEffect } from "react";
import { getParentChildrenEnrolledCourses } from "../api";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const ParentDashboardContent = ({ userId, userName }) => {
  const [students, setStudents] = useState([]);
  const [showCourses, setShowCourses] = useState(false);

  useEffect(() => {
    const fetchParentChildrenCourses = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) throw new Error("No token found");

        const decodedToken = jwtDecode(token);
        const parentId = decodedToken.userId;
        if (!parentId) throw new Error("Parent ID not found in token");

        const data = await getParentChildrenEnrolledCourses(parentId);
        setStudents(data.students || []);
      } catch (error) {
        console.error("Error fetching parent children courses:", error);
      }
    };

    fetchParentChildrenCourses();
  }, []);

  const convertUSDate = (date) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString("en-US");
  };

  return (
    <div className="parent-dashboard-content">
      <h1>Hi {userName},</h1>
      {students.length > 0 ? (
        students.map((student, index) => (
          <div key={index} className="student-courses">
            {student.enrolledCourses.length === 0 ? (
              <h2>
                Your {student.gender === "Male" ? "Son" : "Daughter"}{" "}
                {student.studentName} not Enrolled any Courses Yet.
              </h2>
            ) : (
              <h2>
                Your {student.gender === "Male" ? "Son" : "Daughter"}{" "}
                {student.studentName} {student.enrolledCourses.length} Enrolled
                Course{student.enrolledCourses.length > 1 && "s"}:{" "}
                <button
                  className="show-courses"
                  onClick={() => setShowCourses(!showCourses)}
                >
                  Show Courses
                </button>
              </h2>
            )}
            {student.enrolledCourses.length !== 0 && showCourses && (
              <table className="dashboard-course-table">
                <thead>
                  <tr>
                    <th>Course Name</th>
                    <th>Teacher</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {student.enrolledCourses.map((course, idx) => (
                    <tr key={idx}>
                      <td>{course.courseName}</td>
                      <td>{course.teacher}</td>
                      <td>{convertUSDate(course.startDate)}</td>
                      <td>{convertUSDate(course.endDate)}</td>
                      <td>{course.batch}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        ))
      ) : (
        <p>No enrolled courses found.</p>
      )}
    </div>
  );
};

export default ParentDashboardContent;
