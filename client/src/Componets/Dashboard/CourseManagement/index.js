import React, { useState } from "react";
import Popup from "reactjs-popup";
import "./index.css";
import Sidebar from "../../Sidebar";
import CourseForm from "../../Forms/AddCourseForm";

const CourseManagement = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [courses, setCourses] = useState([
    {
      id: "C001",
      name: "Introduction to Programming",
      startDate: "2023-09-01",
      endDate: "2023-12-15",
      time: "14:00",
      price: "$299.99",
      teacher: "Dr. Alan Turing (T001)"
    },
    {
      id: "C002",
      name: "Web Development Fundamentals",
      startDate: "2023-09-15",
      endDate: "2023-12-20",
      time: "10:00",
      price: "$349.99",
      teacher: "Ada Lovelace (T002)"
    },
    {
      id: "C003",
      name: "Data Science Basics",
      startDate: "2023-10-01",
      endDate: "2024-01-15",
      time: "18:00",
      price: "$399.99",
      teacher: "Grace Hopper (T003)"
    },
    {
      id: "C004",
      name: "Mobile App Development",
      startDate: "2023-10-15",
      endDate: "2024-02-01",
      time: "16:00",
      price: "$449.99",
      teacher: "Steve Jobs (T004)"
    },
    {
      id: "C005",
      name: "Artificial Intelligence",
      startDate: "2023-11-01",
      endDate: "2024-03-15",
      time: "13:00",
      price: "$499.99",
      teacher: "Marvin Minsky (T005)"
    }
  ]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMode, setPopupMode] = useState(""); // "add" or "edit"
  const [currentCourse, setCurrentCourse] = useState(null);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleOpenPopup = (mode, course = null) => {
    setPopupMode(mode);
    setCurrentCourse(course);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setCurrentCourse(null);
  };

  const handleSaveCourse = (course) => {
    if (popupMode === "add") {
      setCourses([...courses, { ...course, id: `C${courses.length + 1}` }]);
    } else if (popupMode === "edit") {
      setCourses(courses.map((c) => (c.id === course.id ? course : c)));
    }
    handleClosePopup();
  };

  const handleDeleteCourse = (courseId) => {
    setCourses(courses.filter((course) => course.id !== courseId));
  };

  return (
    <>
      <div className={`dashboard-page ${isCollapsed ? "sidebar-collapsed" : ""}`}>
        <Sidebar onToggleSidebar={toggleSidebar} isCollapsed={isCollapsed} />
        <div className="main-content">
          <div className="course-manage">
            <div className="course-manage-header">
              <h2>Course Management</h2>
              <button
                className="course-manage-add-btn"
                onClick={() => handleOpenPopup("add")}
              >
                Add New Course
              </button>
            </div>
            <table className="course-manage-table">
              <thead>
                <tr>
                  <th>Course ID</th>
                  <th>Course Name</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Time</th>
                  <th>Price</th>
                  <th>Teacher</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course.id}>
                    <td>{course.id}</td>
                    <td>{course.name}</td>
                    <td>{course.startDate}</td>
                    <td>{course.endDate}</td>
                    <td>{course.time}</td>
                    <td>{course.price}</td>
                    <td>{course.teacher}</td>
                    <td className="course-manage-actions">
                      <button
                        className="course-manage-edit-btn"
                        onClick={() => handleOpenPopup("edit", course)}
                      >
                        Edit
                      </button>
                      <button
                        className="course-manage-delete-btn"
                        onClick={() => handleDeleteCourse(course.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Popup Component */}
      <Popup
        open={isPopupOpen}
        onClose={handleClosePopup}
        modal
        nested
        contentStyle={{ zIndex: 1100, borderRadius: "12px", padding: "20px" }}
        overlayStyle={{ zIndex: 1100, backgroundColor: "rgba(0, 0, 0, 0.6)" }}
      >
        <CourseForm
          mode={popupMode}
          course={currentCourse}
          onSave={handleSaveCourse}
          onClose={handleClosePopup}
        />
      </Popup>
    </>
  );
};



export default CourseManagement;
