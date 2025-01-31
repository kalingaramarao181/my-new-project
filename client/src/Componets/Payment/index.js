import React, { useState, useEffect } from "react";
import { FaCcVisa, FaCcMastercard, FaCcAmex } from "react-icons/fa";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import "./index.css";
import { baseUrl } from "../config";  

const stripePromise = loadStripe("YOUR_STRIPE_PUBLIC_KEY");

const CheckoutForm = ({ amount, courseId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [otpRequired, setOtpRequired] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!stripe || !elements) return;

    const token = Cookies.get("token");
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;

    try {
      // Send payment request to backend
      const { data } = await axios.post(`${baseUrl}make-payment`, {
        amount,
        courseId,
        userId,
      });

      if (data.requires_action) {
        setOtpRequired(true);
        setClientSecret(data.client_secret);
      } else {
        navigate("/courses", {
          state: { successMessage: "Payment successful!" },
        });
      }
    } catch (err) {
      setError("Payment failed. Try again.");
    }

    setLoading(false);
  };

  const handleOtpSubmit = async () => {
    if (!stripe) return;

    try {
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret);
      if (paymentIntent.status === "succeeded") {
        navigate("/courses", {
          state: { successMessage: "Payment successful!" },
        });
      } else {
        setError("OTP Verification Failed.");
      }
    } catch (err) {
      setError("Error confirming OTP.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="course-new-card-form">
      {!otpRequired ? (
        <>
          <h4>Enter Card Details</h4>
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "20px",
                    color: "#333",
                    "::placeholder": {
                      color: "#888",
                    },
                  },
                  invalid: {
                    color: "#ff4d4f",
                  },
                },
              }}
            />
          <button
            type="submit"
            disabled={loading || !stripe}
            className="course-submit-button"
          >
            {loading ? "Processing..." : "Proceed to Payment"}
          </button>
        </>
      ) : (
        <div className="course-otp-form">
          <h4>Enter OTP</h4>
          <button
            type="button"
            onClick={handleOtpSubmit}
            className="course-submit-button"
          >
            Confirm OTP
          </button>
        </div>
      )}
      {error && <p className="error-message">{error}</p>}
    </form>
  );
};

const CoursePayment = () => {
  const { courseId } = useParams();
  const location = useLocation();
  const selectedCourses = location.state?.selectedCourses || [];
  const [amount, setAmount] = useState(5000); // Example amount
  const [userInfo, setUserInfo] = useState({});
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      setShowLoginPopup(true);
      return;
    }

    let decodedToken;
    try {
      decodedToken = jwtDecode(token);
    } catch (error) {
      console.error("Invalid token:", error);
      setShowLoginPopup(true);
      return;
    }

    setUserInfo({
      F_NAME: decodedToken.firstName,
      L_NAME: decodedToken.lastName,
    });
  }, []);

  const handleCancel = () => {
    setShowLoginPopup(false);
    navigate("/courses");
  };

  const handleLogin = () => {
    navigate("/auth");
  };

  return (
    <Elements stripe={stripePromise}>
      <div className="course-card-container">
        {showLoginPopup && (
          <div className="payment-popup-overlay">
            <div className="payment-popup">
              <h2>We need to login</h2>
              <p>
                You need to log in to access this section. Please log in to
                continue.
              </p>
              <div className="payment-popup-buttons">
                <button
                  onClick={handleCancel}
                  className="payment-popup-button payment-cancel-button"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogin}
                  className="payment-popup-button payment-login-button"
                >
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
                <input type="radio" name="payment-method" checked readOnly />
                Card <FaCcVisa /> <FaCcMastercard /> <FaCcAmex />
              </label>
            </div>
            <CheckoutForm amount={amount} courseId={courseId} />
          </div>
          <div className="course-payment-right">
            <div className="course-user-info">
              <p>
                Hi {userInfo.F_NAME} {userInfo.L_NAME},
              </p>
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
    </Elements>
  );
};

export default CoursePayment;
