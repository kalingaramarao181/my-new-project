import React, { useEffect, useState } from 'react';
import './index.css';
import Sidebar from '../../Sidebar';
import { getCourses, getStudents } from '../../api';

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [attendanceStatus, setAttendanceStatus] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const date = new Date().toISOString().split('T')[0];

    if (selectedStudent && selectedCourse && attendanceStatus) {
      const newRecord = {
        id: Date.now(),
        student: selectedStudent,
        course: selectedCourse,
        status: attendanceStatus,
        date,
      };
      setAttendanceData([...attendanceData, newRecord]);
      clearForm();
      alert('Attendance successfully recorded!');
    }
  };

  useEffect(() => {
    const feachStudentData = async () => {
      try {
        const data = await getStudents()
        const coursesData = await getCourses();
        console.log(coursesData);
        setStudents(data);
        setCourses(coursesData);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };
    feachStudentData(); 

  }, []);

  const clearForm = () => {
    setSelectedStudent('');
    setSelectedCourse('');
    setAttendanceStatus('');
  };

  const handleEdit = (record) => {
    setCurrentEdit(record);
    setSelectedStudent(record.student);
    setSelectedCourse(record.course);
    setAttendanceStatus(record.status);
    setIsPopupOpen(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setAttendanceData((prev) =>
      prev.map((record) =>
        record.id === currentEdit.id
          ? { ...record, student: selectedStudent, course: selectedCourse, status: attendanceStatus }
          : record
      )
    );
    setIsPopupOpen(false);
    setCurrentEdit(null);
    clearForm();
    alert('Attendance successfully updated!');
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (

<div className={`dashboard-page ${isCollapsed ? "sidebar-collapsed" : ""}`}>
      <Sidebar onToggleSidebar={toggleSidebar}  isCollapsed={isCollapsed} />
      <div className="main-content">
      <div className="Attendance-container">
            <h1>Attendance Tracking</h1>
            <form className="Attendance-form" onSubmit={handleSubmit}>
              <div className="Attendance-form-group">
                <label htmlFor="student">Student</label>
                <select
                  id="student"
                  className="Attendance-dropdown"
                  value={selectedStudent}
                  onChange={(e) => setSelectedStudent(e.target.value)}
                >
                  {students.map((student) => (
                    <option key={student.id} value={student.name}> {student.name} </option>
                  ))}
                </select>
              </div>

              <div className="Attendance-form-group">
                <label htmlFor="course">Available Courses</label>
                <select
                  id="course"
                  className="Attendance-dropdown"
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                >
                  <option value="">Select a course</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.COURSE_NAME}> {course.COURSE_NAME} </option>
                  ))}
                </select>
              </div>

              <div className="Attendance-form-group">
                <label htmlFor="status">Attendance Status</label>
                <select
                  id="status"
                  className="Attendance-dropdown"
                  value={attendanceStatus}
                  onChange={(e) => setAttendanceStatus(e.target.value)}
                >
                  <option value="">Select a status</option>
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                </select>
              </div>

              <button type="submit" className="Attendance-submit-button">
                Proceed to Record Attendance
              </button>
            </form>
            </div>

            {isPopupOpen && (
              <div className="Attendance-popup">
                <div className="Attendance-popup-content">
                  <h2>Update Attendance</h2>
                  <form onSubmit={handleUpdate}>
                    <div className="Attendance-form-group">
                      <label htmlFor="edit-student">Student</label>
                      <select
                        id="edit-student"
                        className="Attendance-dropdown"
                        value={selectedStudent}
                        onChange={(e) => setSelectedStudent(e.target.value)}
                      >
                        <option value="">Select a student</option>
                        <option value="Student 1">Student 1</option>
                        <option value="Student 2">Student 2</option>
                      </select>
                    </div>

                    <div className="Attendance-form-group">
                      <label htmlFor="edit-course">Available Courses</label>
                      <select
                        id="edit-course"
                        className="Attendance-dropdown"
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                      >
                        <option value="">Select a course</option>
                        <option value="Introduction to Programming">Introduction to Programming</option>
                        <option value="Web Development Fundamentals">Web Development Fundamentals</option>
                      </select>
                    </div>

                    <div className="Attendance-form-group">
                      <label htmlFor="edit-status">Attendance Status</label>
                      <select
                        id="edit-status"
                        className="Attendance-dropdown"
                        value={attendanceStatus}
                        onChange={(e) => setAttendanceStatus(e.target.value)}
                      >
                        <option value="">Select a status</option>
                        <option value="Present">Present</option>
                        <option value="Absent">Absent</option>
                      </select>
                    </div>

                    <button type="submit" className="Attendance-submit-button">
                      Update Attendance
                    </button>
                  </form>
                  <button className="Attendance-close-popup" onClick={() => setIsPopupOpen(false)}>
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
      </div>
  )
}
      

export default Attendance;
