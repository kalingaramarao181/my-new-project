import React, { useState, useEffect } from 'react';
import './index.css';
import {
  FaGooglePay,
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaRegClock,
  FaEuroSign,
} from 'react-icons/fa';
import { MdPayment } from 'react-icons/md';
import { getUser, getCourseDetails, getSavedCards, addNewCard } from '../api';
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const CoursePayment = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [savedCards, setSavedCards] = useState([]);
  const [newCard, setNewCard] = useState({ cardNumber: '', cardHolder: '', expiry: '' });
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [courseDetails, setCourseDetails] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const token = Cookies.get('token');
  const { courseId } = useParams();
  const navigate = useNavigate();  // Hook for navigation

  useEffect(() => {
    // If no token is found, redirect to the /auth page
    if (!token) {
      navigate('/auth');
      return;
    }

    const userId = jwtDecode(token).userId;

    const fetchData = async () => {
      try {
        const userRes = await getUser(userId);
        const courseRes = await getCourseDetails(courseId);
        // const cardsRes = await getSavedCards();
        
        setUserInfo(userRes);
        console.log(courseRes);
        
        setCourseDetails(courseRes);
        // setSavedCards(cardsRes);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [courseId, token, navigate]); // Dependency array includes navigate

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    if (method !== 'credit-card') {
      setSelectedCard(null);
    }
  };

  const handleNewCardChange = (e) => {
    const { name, value } = e.target;
    setNewCard({ ...newCard, [name]: value });
  };

  const handleAddCard = async (e) => {
    e.preventDefault();
    try {
      const response = await addNewCard(newCard);
      setSavedCards([...savedCards, { ...newCard, id: response.id }]);
      setNewCard({ cardNumber: '', cardHolder: '', expiry: '' });
      setIsAddingCard(false);
    } catch (error) {
      console.error('Error adding new card:', error);
    }
  };

  return (
    <div className="course-card-container">
      <header className="course-header">
        <div className="course-logo">Payment</div>
        <div className="course-user-info">
          <p>Hi {userInfo.F_NAME} {userInfo.L_NAME},</p>
          <h2>Pay {courseDetails.COURSE_NAME} €{courseDetails.PRICE}</h2>
        </div>
      </header>

      <div className="course-main-content">
        <div className="course-payment-options">
          <button className="course-payment-button google-pay">
            <FaGooglePay /> G Pay
          </button>
          <div className="course-options">
            <label>
              <input
                type="radio"
                name="payment-method"
                onChange={() => handlePaymentMethodChange('credit-card')}
              />
              Card <FaCcVisa /> <FaCcMastercard /> <FaCcAmex />
            </label>
            <label>
              <input
                type="radio"
                name="payment-method"
                onChange={() => handlePaymentMethodChange('ideal')}
              />
              iDEAL <MdPayment />
            </label>
            <label>
              <input
                type="radio"
                name="payment-method"
                onChange={() => handlePaymentMethodChange('pay-later')}
              />
              Pay later <FaRegClock />
            </label>
            <label>
              <input
                type="radio"
                name="payment-method"
                onChange={() => handlePaymentMethodChange('sofort')}
              />
              Sofort <FaEuroSign />
            </label>
          </div>

          {paymentMethod === 'credit-card' && (
            <div className="course-saved-cards">
              <h4>Saved Cards</h4>
              {savedCards.map((card) => (
                <div
                  key={card.id}
                  className={`course-card-item ${selectedCard === card.id ? 'selected' : ''}`}
                  onClick={() => setSelectedCard(card.id)}
                >
                  <p>{card.cardNumber}</p>
                  <p>{card.cardHolder}</p>
                  <p>{card.expiry}</p>
                </div>
              ))}
              <button
                className="course-payment-button"
                onClick={() => setIsAddingCard(!isAddingCard)}
              >
                {isAddingCard ? 'Cancel' : 'Add New Card'}
              </button>

              {isAddingCard && (
                <form onSubmit={handleAddCard} className="course-new-card-form">
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number"
                    value={newCard.cardNumber}
                    onChange={handleNewCardChange}
                    required
                  />
                  <input
                    type="text"
                    name="cardHolder"
                    placeholder="Card Holder Name"
                    value={newCard.cardHolder}
                    onChange={handleNewCardChange}
                    required
                  />
                  <input
                    type="text"
                    name="expiry"
                    placeholder="Expiry Date (MM/YY)"
                    value={newCard.expiry}
                    onChange={handleNewCardChange}
                    required
                  />
                  <button type="submit" className="course-payment-button">
                    Save Card
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

        <div className="course-summary">
          <h3>Summary</h3>
          <ul>
            <li>
              <span>Course Name</span>
              <span>{courseDetails.COURSE_NAME}</span>
            </li>
            <li>
              <span>Start Date</span>
              <span>{new Date(courseDetails.START_DT).toLocaleDateString()} {courseDetails.START_TIME}</span>
            </li>
            <li>
              <span>End Date</span>
              <span>{new Date(courseDetails.END_DT).toLocaleDateString()} {courseDetails.END_TIME}</span>
            </li>
          </ul>
          <h4>Total order amount: €{courseDetails.PRICE}</h4>
        </div>
      </div>

      <div className="course-personal-info">
        <p>Personal information</p>
        <p>{userInfo.F_NAME} {userInfo.L_NAME}, {userInfo.EMAIL}</p>
      </div>
      <button className="course-pay-button">Pay €{courseDetails.PRICE}</button>
    </div>
  );
};

export default CoursePayment;
