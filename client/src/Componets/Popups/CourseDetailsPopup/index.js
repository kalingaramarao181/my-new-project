import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "./index.css";
import { getCourseDetails, getUser } from "../../api";

const CourseDetails = ({ isOpenCourseDetails, closeCourseDetails, courseId }) => {
  const [course, setCourse] = useState({});
  const [teacherName, setTeacherName] = useState("");

  useEffect(() => {
    const fetchCourseDetails = async () => {
      if (!courseId) return; // Prevent API call if courseId is missing

      try {
        const courseData = await getCourseDetails(courseId);
        setCourse(courseData);

        if (courseData.TEACHER_ID) {
          fetchTeacherName(courseData.TEACHER_ID);
        }
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  const fetchTeacherName = async (teacherId) => {
    try {
      const teacher = await getUser(teacherId);
      setTeacherName(`${teacher.F_NAME} ${teacher.L_NAME}`);
    } catch (error) {
      console.error("Error fetching teacher details:", error);
    }
  };

  const convertUSDate = (date) => {
    if (!date) return "N/A"; // Handle missing dates
    const dateObj = new Date(date);
    return isNaN(dateObj.getTime()) ? "Invalid Date" : dateObj.toLocaleDateString("en-US");
  };

  return (
    <Popup
      open={isOpenCourseDetails}
      onClose={closeCourseDetails}
      modal
      nested
      contentStyle={{ zIndex: 1100, borderRadius: "12px", padding: "20px" }}
      overlayStyle={{ zIndex: 1100, backgroundColor: "rgba(0, 0, 0, 0.6)" }}
    >
      <div className="course-details-popup-container">
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
            <tr>
              <td>{course.COURSE_NAME || "N/A"}</td>
              <td>{teacherName || "N/A"}</td>
              <td>{convertUSDate(course.START_DT)}</td>
              <td>{convertUSDate(course.END_DT)}</td>
              <td>{course.BATCH || "N/A"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Popup>
  );
};

export default CourseDetails;
