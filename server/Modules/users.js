// routes/users.js
const express = require('express');
const db = require('../Config/connection');

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
  
    let hashedPassword = null;
    if (updatedData.password) {
      try {
        hashedPassword = await bcrypt.hash(updatedData.password, 10);
      } catch (error) {
        console.error("Error hashing password:", error);
        return res.status(500).json({ message: "Error hashing password" });
      }
    }
  
    const query = `
      UPDATE member
      JOIN user ON member.MEMBER_ID = user.MEMBER_ID
      SET 
        member.ADD1 = ?, 
        member.ADD2 = ?, 
        member.CITY = ?, 
        member.STATE = ?, 
        member.ZIP = ?, 
        user.PWD = ?
      WHERE user.MEMBER_ID = ?
    `;
  
    db.query(query, [
      updatedData.address1,
      updatedData.address2,
      updatedData.city,
      updatedData.state,
      updatedData.zip,
      hashedPassword || updatedData.password,
      userId
    ], (err, results) => {
      if (err) {
        console.error("Error updating user data:", err);
        return res.status(500).json({ message: "Error updating user data" });
      }
  
      res.json({ message: "User data updated successfully" });
    });
  });
  

module.exports = router;
