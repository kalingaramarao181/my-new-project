import React, { useState, useEffect } from 'react';
import './index.css';
import { FaCcVisa, FaCcMastercard, FaCcAmex } from 'react-icons/fa';
import { getUser, getCourseDetails } from '../api';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';

const CoursePayment = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [newCard, setNewCard] = useState({
    cardNumber: '',
    cardHolder: '',
    expiry: '',
    cvv: '',
    billingAddress: '',
    userId: null
  });
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [, setCourseDetails] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const { courseId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const selectedCourses = location.state?.selectedCourses || [];

  useEffect(() => {
    const token = Cookies.get('token');

    if (!token) {
      setShowLoginPopup(true);
      return;
    }

    let decodedToken;
    try {
      decodedToken = jwtDecode(token);
    } catch (error) {
      console.error('Invalid token:', error);
      setShowLoginPopup(true);
      return;
    }

    const userId = decodedToken.userId;

    setNewCard((prev) => ({ ...prev, userId }));

    const fetchData = async () => {
      try {
        const userRes = await getUser(userId);
        const courseRes = await getCourseDetails(courseId);

        setUserInfo(userRes);
        setCourseDetails(courseRes);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [courseId]);

  const handleCancel = () => {
    setShowLoginPopup(false);
    navigate('/courses');
  };

  const handleLogin = () => {
    navigate('/auth');
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    setNewCard((prev) => ({ ...prev, [name]: value }));
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handlePayment = () => {
    setOtpSent(true);
  };

  const handleOtpSubmit = () => {
    console.log('Payment successful with OTP:', otp);
    navigate('/courses');
  };

  return (
    <div className="course-card-container">
      {showLoginPopup && (
        <div className="payment-popup-overlay">
          <div className="payment-popup">
            <h2>We need to login</h2>
            <p>You need to log in to access this section. Please log in to continue.</p>
            <div className="payment-popup-buttons">
              <button onClick={handleCancel} className="payment-popup-button payment-cancel-button">
                Cancel
              </button>
              <button onClick={handleLogin} className="payment-popup-button payment-login-button">
                Login
              </button>
            </div>
          </div>
        </div>
      )}
      <header className="course-header">
        <div className="course-logo">Payment</div>
      </header>

      <div className="course-main-content">
      <div className="course-payment-left">
          <div className="course-payment-options">
            <label>
              <input
                type="radio"
                name="payment-method"
                onChange={() => handlePaymentMethodChange('credit-card')}
              />
              Card <FaCcVisa /> <FaCcMastercard /> <FaCcAmex />
            </label>
          </div>

          {paymentMethod === 'credit-card' && !otpSent && (
            <div className="course-new-card-form">
              <h4>Enter Card Details</h4>
              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                value={newCard.cardNumber}
                onChange={handleCardInputChange}
              />
              <input
                type="text"
                name="cardHolder"
                placeholder="Card Holder"
                value={newCard.cardHolder}
                onChange={handleCardInputChange}
              />
              <input
                type="text"
                name="expiry"
                placeholder="Expiry Date (MM/YY)"
                value={newCard.expiry}
                onChange={handleCardInputChange}
              />
              <input
                type="text"
                name="cvv"
                placeholder="CVV"
                value={newCard.cvv}
                onChange={handleCardInputChange}
              />
              <input
                type="text"
                name="billingAddress"
                placeholder="Billing Address"
                value={newCard.billingAddress}
                onChange={handleCardInputChange}
              />
              <button onClick={handlePayment} className="course-submit-button">
                Proceed to Payment
              </button>
            </div>
          )}

          {otpSent && (
            <div className="course-otp-form">
              <h4>Enter OTP</h4>
              <input
                type="text"
                placeholder="OTP"
                value={otp}
                onChange={handleOtpChange}
              />
              <button onClick={handleOtpSubmit} className="course-submit-button">
                Submit OTP
              </button>
            </div>
          )}
        </div>
        <div className="course-payment-right">
          <div className="course-user-info">
            <p>Hi {userInfo.F_NAME} {userInfo.L_NAME},</p>
            <h2>Pay for Selected Courses</h2>
            <ul>
              {selectedCourses.map((course, index) => (
                <li key={index}>{course}</li>
              ))}
            </ul>
          </div>
        </div>


      </div>
    </div>
  );
};

export default CoursePayment;
