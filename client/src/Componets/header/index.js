import React, { useState, useEffect } from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import {Link} from "react-router-dom"
import './index.css';

function Header() {
  const location = useLocation();
  const navigate = useNavigate(); 
  const [showLogo, setShowLogo] = useState(true)
  const [showNavbar, setShowNavbar] = useState(true)
  const [dropdownVisible, setDropdownVisible] = useState(false);
    const [user, setUser] = useState({
      fullName: "Guest",
      email: "",
    });

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {
      navigate("/");
    };


  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY <= 0) {
        setShowLogo(true);
      } else if (window.scrollY > lastScrollY) {
        setShowLogo(false);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className="header-container">
      <div className="header-top">
      <h1 className='top-section-mark'>Please click here for SOSAAL program announcements and latest news.</h1>
        <div className="contact-info">
          <div className='contact-info-sub'>
          <span>admin@sosaal.org</span>
          <span>+1 (312) 402 2442</span>
          </div>
          
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <select className='language-select-options'>
              <option>English</option>
              <option>Hindi</option>
              <option>Telugu</option>
              <option>Telugu</option>
            </select>
          </div>
        </div>
      </div>

      <nav className="navbar">
        <div className="navbar-left">
          {/* <span>Please write your suggestions to <a className='mail-span'>admin@sosaal.org</a></span> */}
        <div className={`logo-image-container ${showLogo ? '' : 'hidden-logo'}`}>
        <img src="\Images\sasaal_logo.png" alt="Logo" className="logo" />
        </div>
        </div>
        <ul className="navbar-menu">
          <li><Link to="/">Home</Link></li>
          <li className="nav-dropdown">
            <Link to="/#aboutUs">AboutUs</Link>
            <ul className="dropdown-menu">
              <li><a href="#">Who we are</a></li>
              <li><a href="#">What we do</a></li>
              <li><a href="#">Why we do</a></li>
              <li><a href="#">Testimonials</a></li>
            </ul>
          </li>
          <li className="nav-dropdown">
            <a href="#">Services</a>
            <ul className="dropdown-menu">
              <li><a href="#">Will & Trust</a></li>
              <li><a href="#">Life Insurance</a></li>
              <li><a href="#">Health Plans</a></li>
              <li><a href="#">Home Service</a></li>
            </ul>
          </li>
          <li><Link to="/cources">Courses</Link></li>
          <li><a href="#"> Research</a></li>
        </ul>
        { location.pathname.slice(1) !== "dashboard" ? <Link to="auth">
          <button className='signin-button'>SignSignUp</button>
        </Link> :

        <div className="user-info">
        <p className="user-welcome-text" onClick={toggleDropdown}>
          {user.fullName}
          <img
            src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
            className="profile-image"
            alt="profile"
          />
        </p>
        {dropdownVisible && (
          <div className="dropdown">
            <ul>
              <li>
                <span>Account</span>
              </li>
              <li>Profile</li>
              <li>Personal Settings</li>
              <li>Notifications</li>
              <li onClick={handleLogout}>Logout</li> {/* Logout Action */}
            </ul>
          </div>
        )}
      </div>}
        
      </nav>
    </header>
  );
}

export default Header;
