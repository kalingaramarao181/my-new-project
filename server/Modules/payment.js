const express = require("express");
const router = express.Router();
const PaytmChecksum = require("paytmchecksum");
const https = require("https");
const db = require('../Config/connection');


// Paytm Configuration
const PAYTM_MERCHANT_ID = "YOUR_MERCHANT_ID";
const PAYTM_MERCHANT_KEY = "YOUR_MERCHANT_KEY";
const PAYTM_WEBSITE = "YOUR_WEBSITE";
const PAYTM_CALLBACK_URL = "YOUR_CALLBACK_URL";
const PAYTM_TXN_URL =
  "https://securegw-stage.paytm.in/theia/processTransaction"; // Use production URL for live

// Pay with Paytm and Save Transaction
router.post("/payWithPaytm", async (req, res) => {
  const { amount, courseId, cardId } = req.body;

  const orderId = `ORDER_${new Date().getTime()}`;
  const customerId = `CUST_${new Date().getTime()}`;

  const paytmParams = {
    MID: PAYTM_MERCHANT_ID,
    WEBSITE: PAYTM_WEBSITE,
    CHANNEL_ID: "WEB",
    INDUSTRY_TYPE_ID: "Retail",
    ORDER_ID: orderId,
    CUST_ID: customerId,
    TXN_AMOUNT: amount.toString(),
    CALLBACK_URL: PAYTM_CALLBACK_URL,
  };

  try {
    const checksum = await PaytmChecksum.generateSignature(
      paytmParams,
      PAYTM_MERCHANT_KEY
    );
    paytmParams.CHECKSUMHASH = checksum;

    const post_data = JSON.stringify(paytmParams);

    const options = {
      hostname: "securegw-stage.paytm.in",
      port: 443,
      path: "/theia/processTransaction",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": post_data.length,
      },
    };

    const request = https.request(options, (response) => {
      let data = "";
      response.on("data", (chunk) => {
        data += chunk;
      });
      response.on("end", () => {
        const result = JSON.parse(data);

        if (result.STATUS === "TXN_SUCCESS") {
          // Insert transaction into database
          const query = `INSERT INTO transactions (order_id, customer_id, course_id, amount, status) VALUES (?, ?, ?, ?, ?)`;
          db.query(
            query,
            [orderId, customerId, courseId, amount, "SUCCESS"],
            (err) => {
              if (err) {
                console.error("Error inserting transaction:", err);
                return res
                  .status(500)
                  .json({ success: false, message: "Database error" });
              }

              res.json({
                success: true,
                message: "Payment successful",
                data: result,
              });
            }
          );
        } else {
          res.json({ success: false, message: "Payment failed", data: result });
        }
      });
    });

    request.on("error", (error) => {
      console.error("Error in payment request:", error);
      res
        .status(500)
        .json({ success: false, message: "Payment request failed" });
    });

    request.write(post_data);
    request.end();
  } catch (error) {
    console.error("Error handling payment:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Get Transaction Details
router.get("/transactions", (req, res) => {
  const query = "SELECT * FROM transactions ORDER BY created_at DESC";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error retrieving transactions:", err);
      return res
        .status(500)
        .json({ success: false, message: "Database error" });
    }

    res.json({ success: true, data: results });
  });
});

router.post("/saved-cards", (req, res) => {
    console.log(req.body);
    
  const {
    cardNumber,
    cardHolder,
    expiry,
    cvv,
    billingAddress,
    userId,
  } = req.body;

  const query = `
      INSERT INTO saved_cards (card_number, card_holder, expiry_date, cvv, billing_address, user_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
  db.query(
    query,
    [cardNumber, cardHolder, expiry, cvv, billingAddress, userId],
    (err, results) => {
      if (err) {
        console.error("Error adding new card:", err);
        return res.status(500).json({ message: "Error adding new card" });
      }
      res
        .status(200)
        .json({ message: "Card added successfully", cardId: results.insertId });
    }
  );
});

router.get("/saved-cards/:userId", (req, res) => {
  const userId = req.params.userId;

  const query = "SELECT * FROM saved_cards WHERE user_id = ?";
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error retrieving saved cards:", err);
      return res.status(500).json({ message: "Error retrieving saved cards" });
    }
    res.status(200).json(results);
  });
});

module.exports = router;
