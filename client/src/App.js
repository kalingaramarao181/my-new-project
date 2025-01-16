import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Componets/home';
import Dashboard from './Componets/Dashboard';
import Login from './Componets/Auth';
import Cources from './Componets/Cources';
import Header from './Componets/header';
import Footer from './Componets/Footer';
import Attendance from './Componets/Dashboard/Attendance';
import StudentRegisteration from './Componets/Dashboard/StudentRegisteration';
import VolunteerRegistration from './Componets/Dashboard/VolunteerRegistration';
import CourseEnrollment from './Componets/Dashboard/CourceEnrollment';


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard/>} />    
        <Route path="/courses" element={<Cources/>} />
        <Route path="/attendance" element={<Attendance/>} />
        <Route path="/student-reg" element={<StudentRegisteration/>} />
        <Route path="/volunteer-reg" element={<VolunteerRegistration/>} />
        <Route path="/course-enm" element={<CourseEnrollment/>} />


        {/* Add more routes here */}
      </Routes>
    <Footer/>
    </Router>
  );
}

export default App;
