import React, { useState, useEffect } from 'react';
import './index.css';
import { GiTeacher } from "react-icons/gi";
import { PiStudentFill } from "react-icons/pi";
import { IoPersonCircle } from "react-icons/io5";
import LoginForm from '../Popups/loginForm';

const Login = () => {
  const [role, setRole] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const togglePopup = (loginRole) => {
    setRole(loginRole)
    setIsPopupOpen(!isPopupOpen);
  }

  return (
    <div className="login-container">
      <div className="login-header">
        <h1>LOGIN NOW</h1>
      </div>
      <div className="login-card-container">
        <div className="login-role-card" onClick={() => togglePopup('Parent')}>
          <div className="login-card-icon"><GiTeacher /></div>
          <h2>Parent</h2>
          <button className="login-role-button">Login/SignUp</button> 
        </div>

        <div className="login-role-card" onClick={() => togglePopup('Student')}>
          <div className="login-card-icon"><PiStudentFill /></div>
          <h2>Student</h2>
          <button className="login-role-button">Login/SignUp</button>
        </div>

        <div className="login-role-card" onClick={() => togglePopup('Volunteer')}>
          <div className="login-card-icon"><IoPersonCircle /></div>
          <h2>Volunteer</h2>
          <button className="login-role-button">Login/SignUp</button>
        </div>
      </div>
      <LoginForm
          isPopupOpen={isPopupOpen}
          closePopup={() => setIsPopupOpen(false)}
          role={role}
        />
    </div>
  );
};

export default Login;
