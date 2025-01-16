import React from 'react';
import './index.css'; // Ensure this CSS file contains the styles below
import { FaEnvelope, FaPhone } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About Section */}
        <div className="footer-section">
          <h4>About</h4>
          <p>
            Originally Shruthi Vasudevan conceived this idea and subsequently assembled a team of volunteers to form
            this Non-Profit Organization: School of Science and Ancient Literature. The purpose is to excavate the
            science and technology embedded in ancient literature and educate the present/upcoming generation.
          </p>
        </div>

        {/* Quick Links Section */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#who">Who are we</a></li>
            <li><a href="#what">What we do</a></li>
            <li><a href="#register">Register</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        {/* Useful Links Section */}
        <div className="footer-section">
          <h4>Useful Links</h4>
          <ul>
            <li><a href="#terms">Terms of Service</a></li>
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#disclosures">Disclosures</a></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="footer-section">
          <h4>Contact</h4>
          <p><FaEnvelope className="footer-icon" /> admin@sosaal.org</p>
          <p><FaPhone className="footer-icon" /> +1 (312) 402 2442</p>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="footer-bottom">
        <hr />
        <p>© 2024 All rights reserved by Sosaal</p>
      </div>
    </footer>
  );
};

export default Footer;