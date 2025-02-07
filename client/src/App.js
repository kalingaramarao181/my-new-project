import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Componets/home';
import Dashboard from './Componets/Dashboard';
import Login from './Componets/Auth';
import Courses from './Componets/Cources';
import Header from './Componets/header';
import Footer from './Componets/Footer';
import Attendance from './Componets/Dashboard/Attendance';
import StudentRegisteration from './Componets/Dashboard/StudentRegisteration';
import VolunteerRegistration from './Componets/Dashboard/VolunteerRegistration';
import CourseEnrollment from './Componets/Dashboard/CourceEnrollment';
import CourseManagement from './Componets/Dashboard/CourseManagement';
import Secure from './Componets/Secure';
import CoursePayment from './Componets/Payment';
import Profile from './Componets/Dashboard/Profile';


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Login />} />
        <Route path="/courses" element={<Courses />} />
        <Route path='/course-payment/:courseId' element={<CoursePayment />} />
        <Route path="/payment" element={<CoursePayment />} />
        <Route path="/dashboard" element={<Secure />}>
          <Route index element={<Dashboard />} />
        </Route>
        <Route path="/student-reg" element={<Secure />}>
          <Route index element={<StudentRegisteration />} />
        </Route>
        <Route path="/course-enm" element={<Secure />}>
          <Route index element={<CourseEnrollment />} />
        </Route>
        <Route path="/attendance" element={<Secure />}>
          <Route index element={<Attendance />} />
        </Route>
        <Route path="/course-management" element={<Secure />}>
          <Route index element={<CourseManagement />} />
        </Route>
        <Route path="/volunteer-reg" element={<Secure />}>
          <Route index element={<VolunteerRegistration />} />
        </Route>
        <Route path="/profile" element={<Secure />}>
          <Route index element={<Profile />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
