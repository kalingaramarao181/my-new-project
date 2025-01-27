import React, { useState, useEffect } from 'react';
import './index.css';
import { FaCcVisa, FaCcMastercard, FaCcAmex } from 'react-icons/fa';
import { getUser, getCourseDetails, getSavedCards } from '../api';
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';

const CoursePayment = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [savedCards, setSavedCards] = useState([]);
  const [newCard, setNewCard] = useState({
    cardNumber: '',
    cardHolder: '',
    expiry: '',
    cvv: '',
    billingAddress: '',
    userId: null
  });
  const [selectedCard, setSelectedCard] = useState(null);
  const [courseDetails, setCourseDetails] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [showLoginPopup, setShowLoginPopup] = useState(false); // State to control popup visibility
  const { courseId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('token');

    if (!token) {
      setShowLoginPopup(true); // Show the popup
      return;
    }

    let decodedToken;
    try {
      decodedToken = jwtDecode(token);
    } catch (error) {
      console.error('Invalid token:', error);
      setShowLoginPopup(true); // Show the popup
      return;
    }

    const userId = decodedToken.userId;

    setNewCard((prev) => ({ ...prev, userId }));

    const fetchData = async () => {
      try {
        const userRes = await getUser(userId);
        const courseRes = await getCourseDetails(courseId);
        const cardsRes = await getSavedCards(userId);

        setUserInfo(userRes);
        setCourseDetails(courseRes);
        setSavedCards(cardsRes);
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
    if (method !== 'credit-card') {
      setSelectedCard(null);
    }
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
      {/* Rest of your component */}
      <header className="course-header">
        <div className="course-logo">Payment</div>
        <div className="course-user-info">
          <p>Hi {userInfo.F_NAME} {userInfo.L_NAME},</p>
          <h2>Pay {courseDetails.COURSE_NAME} €{courseDetails.PRICE}</h2>
        </div>
      </header>

      <div className="course-main-content">
        {/* Payment Options */}
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

        {/* Render Saved Cards */}
        {paymentMethod === 'credit-card' && (
          <div className="course-saved-cards">
            <h4>Saved Cards</h4>
            {savedCards.map((card) => (
              <div
                key={card.id}
                className={`course-card-item ${selectedCard === card.id ? 'selected' : ''}`}
                onClick={() => setSelectedCard(card.id)}
              >
                <p><span>Card Holder: </span>{card.card_holder}</p>
                <p><span>Card Number: </span>{card.card_number}</p>
                <p><span>Expiry Date: </span>{card.expiry_date}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursePayment;
