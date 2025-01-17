import React, { useState } from 'react';
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

const CoursePayment = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [savedCards, setSavedCards] = useState([
    { id: 1, cardNumber: '**** **** **** 1234', cardHolder: 'John Doe', expiry: '12/24' },
    { id: 2, cardNumber: '**** **** **** 5678', cardHolder: 'Jane Smith', expiry: '01/25' },
  ]);
  const [newCard, setNewCard] = useState({ cardNumber: '', cardHolder: '', expiry: '' });
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

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

  const handleAddCard = (e) => {
    e.preventDefault();
    setSavedCards([...savedCards, { ...newCard, id: Date.now() }]);
    setNewCard({ cardNumber: '', cardHolder: '', expiry: '' });
    setIsAddingCard(false);
  };

  return (
    <div className="course-card-container">
      <header className="course-header">
        <div className="course-logo">K</div>
        <div className="course-user-info">
          <p>Hi Joe Bloggs,</p>
          <h2>Pay AspireCo €1,749.96</h2>
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
              <span>144Hz gaming monitor</span>
              <span>€1,399.98 (2 x €699.99)</span>
            </li>
            <li>
              <span>Wireless gaming mouse</span>
              <span>€149.99</span>
            </li>
            <li>
              <span>Mechanical switch keyboard with wrist rest</span>
              <span>€199.99</span>
            </li>
          </ul>
          <h4>Total order amount: €1,749.96</h4>
        </div>
      </div>

      <div className="course-personal-info">
        <p>Personal information</p>
        <p>Joe Bloggs, joe.bloggs@example.com</p>
      </div>
      <button className="course-pay-button">Pay €1,749.96</button>
    </div>
  );
};

export default CoursePayment;
