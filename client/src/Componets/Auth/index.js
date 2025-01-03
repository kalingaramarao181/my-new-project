import React, { useState, useEffect } from 'react';
import './index.css'; // External CSS for styles
import { RiAdminFill } from "react-icons/ri";
import { IoMdPersonAdd } from "react-icons/io";
import { GiTeacher } from "react-icons/gi";
import { PiStudentFill } from "react-icons/pi";
import { IoPersonCircle } from "react-icons/io5";
import Header from '../header';
import { Link } from 'react-router-dom';

const Login = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [role, setRole] = useState('');

  useEffect(() => {
    // Add a class name to the body when the component is mounted
    document.body.classList.add('login-page');
    
    // Cleanup the class name when the component is unmounted
    return () => {
      document.body.classList.remove('login-page');
    };
  }, []);

  const handleLoginClick = (selectedRole) => {
    setRole(selectedRole);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
    <Header />
    <div className="login-container">
      <div className="login-header">
        <h1>LOGIN NOW</h1>
      </div>
      <div className="login-card-container">
        <div className="login-role-card" onClick={() => handleLoginClick('Parent')}>
          <div className="login-card-icon"><GiTeacher /></div>
          <h2>Parent</h2>
          <button className="login-role-button">Login</button>
        </div>

        <div className="login-role-card" onClick={() => handleLoginClick('Student')}>
          <div className="login-card-icon"><PiStudentFill /></div>
          <h2>Student</h2>
          <button className="login-role-button">Login</button>
        </div>

        <div className="login-role-card" onClick={() => handleLoginClick('Volunteer')}>
          <div className="login-card-icon"><IoPersonCircle /></div>
          <h2>Volunteer</h2>
          <button className="login-role-button">Login</button>
        </div>
      </div>

      {showPopup && (
        <div className="login-popup">
          <div className="login-popup-content">
            <h2>Welcome to {role}</h2>
            <form>
              <label className='login-label'>Email</label>
              <input type="email" placeholder="Enter your email" />
              <label className='login-label'>Password</label>
              <input type="password" placeholder="Enter your password" />
              <Link to="/dashboard"> <button type="submit" className="login-popup-login-button">Login</button></Link>
            </form>
            <p className="login-forgot-password">SignUp / Forgot Password?</p>
            <button className="login-close-popup" onClick={closePopup}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default Login;
