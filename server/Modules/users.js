// routes/users.js
const express = require('express');
const db = require('../Config/connection');
const bcrypt = require('bcrypt');

const router = express.Router();

router.get('/users/:userId', (req, res) => {
  const userId = req.params.userId;

  const query = `
    SELECT member.*, user.*
    FROM member
    JOIN user ON member.MEMBER_ID = user.MEMBER_ID
    WHERE user.MEMBER_ID = ?
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching user data:", err);
      return res.status(500).json({ message: "Error fetching user data" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const userData = results[0];

    res.json(userData);
  });
});

router.put('/users/:userId', async (req, res) => {
  const userId = req.params.userId;
  const updatedData = req.body;
  console.log(updatedData, userId);
  
  try {
      let query = `
        UPDATE member
        JOIN user ON member.MEMBER_ID = user.MEMBER_ID
        SET 
      `;
      
      const queryParams = [];
      
      // Check and append fields to the query
      if (updatedData.F_NAME) {
        query += "member.F_NAME = ?, ";
        queryParams.push(updatedData.F_NAME);
      }
      if (updatedData.L_NAME) {
        query += "member.L_NAME = ?, ";
        queryParams.push(updatedData.L_NAME);
      }
      if (updatedData.ADD1) {
        query += "member.ADD1 = ?, ";
        queryParams.push(updatedData.ADD1);
      }
      if (updatedData.ADD2) {
        query += "member.ADD2 = ?, ";
        queryParams.push(updatedData.ADD2);
      }
      if (updatedData.CITY) {
        query += "member.CITY = ?, ";
        queryParams.push(updatedData.CITY);
      }
      if (updatedData.STATE) {
        query += "member.STATE = ?, ";
        queryParams.push(updatedData.STATE);
      }
      if (updatedData.ZIP) {
        query += "member.ZIP = ?, ";
        queryParams.push(updatedData.ZIP);
      }
      if (updatedData.PWD) {
        const hashedPassword = await bcrypt.hash(updatedData.PWD, 10);
        query += "user.PWD = ?, ";
        queryParams.push(hashedPassword);
      }
      
      // Remove last trailing comma and space
      query = query.slice(0, -2);

      query += " WHERE user.MEMBER_ID = ?";
      queryParams.push(userId);

      // Execute query
      db.query(query, queryParams, (err, results) => {
          if (err) {
              console.error("Error updating user data:", err);
              return res.status(500).json({ message: "Error updating user data" });
          }

          res.json({ message: "User data updated successfully" });
      });
  } catch (error) {
      console.error("Error updating user data:", error);
      res.status(500).json({ message: "Internal server error" });
  }
});

router.get('/students', (req, res) => {
  const query = `
    SELECT MEMBER_ID AS id, CONCAT(F_NAME, ' ', L_NAME) AS name
    FROM member
    WHERE MEMBER_TYPE_ID = 4
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching students:", err);
      return res.status(500).json({ message: "Error fetching students" });
    }

    res.json(results);
  });
});

module.exports = router;
