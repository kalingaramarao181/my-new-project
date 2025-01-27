import React, { useState, useEffect } from 'react';
import './index.css';
import {  FaCcVisa, FaCcMastercard, FaCcAmex } from 'react-icons/fa';
import { getUser, getCourseDetails, getSavedCards, addNewCard, payWithPaytm } from '../api';
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const CoursePayment = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [savedCards, setSavedCards] = useState([]);
  const [newCard, setNewCard] = useState({
    cardNumber: '',
    cardHolder: '',
    expiry: '',
    cvv: '',
    billingAddress: '',
    userId: jwtDecode(Cookies.get('token')).userId || 3
  });
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [courseDetails, setCourseDetails] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const token = Cookies.get('token');
  const { courseId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/auth');
      return;
    }

    const userId = jwtDecode(token).userId;

    const fetchData = async () => {
      try {
        const userRes = await getUser(userId);
        const courseRes = await getCourseDetails(courseId);
        const cardsRes = await getSavedCards(userId);

        setUserInfo(userRes);
        setCourseDetails(courseRes);
        setSavedCards(cardsRes);
        console.log(cardsRes);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [courseId, token, navigate]);

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
      setNewCard({ cardNumber: '', cardHolder: '', expiry: '', cvv: '', billingAddress: '' });
      setIsAddingCard(false);
    } catch (error) {
      console.error('Error adding new card:', error);
    }
  };

  const handlePay = async () => {
    try {
      if (selectedCard) {
        const paymentData = {
          amount: courseDetails.PRICE,
          courseId,
          cardId: selectedCard
        };

        const response = await payWithPaytm(paymentData);  // API call to process payment
        if (response.success) {
          alert('Payment successful!');
        } else {
          alert('Payment failed. Please try again.');
        }
      } else {
        alert('Please select a saved card or add a new one.');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Payment failed. Please try again later.');
    }
  };

  const addCardNumberSpaces = (cardNumber) => {
    return cardNumber.replace(/(\d{4})/g, '$1 ').trim();
  }

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
          <div className="course-options">
            <label>
              <input
                type="radio"
                name="payment-method"
                onChange={() => handlePaymentMethodChange('credit-card')}
              />
              Card <FaCcVisa /> <FaCcMastercard /> <FaCcAmex />
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
                  <p><span>Card Holder: </span>{card.card_holder}</p>
                  <p><span>Card Number: </span>{addCardNumberSpaces(card.card_number)}</p>
                  <p><span>Expiry Date: </span>{card.expiry_date}</p>
                </div>
              ))}
              <button className="course-payment-button" onClick={() => setIsAddingCard(!isAddingCard)}>
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
                  <input
                    type="text"
                    name="cvv"
                    placeholder="CVV"
                    value={newCard.cvv}
                    onChange={handleNewCardChange}
                    required
                  />
                  <input
                    type="text"
                    name="billingAddress"
                    placeholder="Billing Address"
                    value={newCard.billingAddress}
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

        <button className="course-pay-button" onClick={handlePay}>
          Pay €{courseDetails.PRICE}
        </button>
      </div>
    </div>
  );
};

export default CoursePayment;
