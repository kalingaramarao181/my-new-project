const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../Config/connection'); 
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

const checkUserExists = (email) => {
  return new Promise((resolve, reject) => {
    const checkUserSql = 'SELECT * FROM USER u JOIN MEMBER m ON u.MEMBER_ID = m.MEMBER_ID WHERE m.EMAIL = ?';
    db.query(checkUserSql, [email], (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(data);
    });
  });
};

const generateUserId = async (lastName) => {
  let userId;
  let uniqueNumber = 1;

  userId = `${lastName}${String(uniqueNumber).padStart(3, '0')}`;

  const existingUser = await checkUserIdExists(userId);

  while (existingUser.length > 0) {
    uniqueNumber++;
    userId = `${lastName}${String(uniqueNumber).padStart(3, '0')}`;
  }

  return userId;
};

const checkUserIdExists = (userId) => {
  return new Promise((resolve, reject) => {
    const checkUserIdSql = 'SELECT * FROM USER WHERE USER_ID = ?';
    db.query(checkUserIdSql, [userId], (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(data);
    });
  });
};

const insertUser = (userData) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO USER (MEMBER_ID, PWD, ACTIVE, USER_ID) VALUES (?, ?, ?, ?)';
    db.query(sql, userData, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

router.post('/signup', async (req, res) => {
  try {
    const { firstName, lastName, email, mobile, memberType, password, roleId } = req.body;

    const role = roleId || 3;

    if (!firstName || !lastName || !email || !mobile || !password) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUsers = await checkUserExists(email);
    if (existingUsers.length > 0) {
      return res.status(400).json({ error: 'User already exists with this email.' });
    }

    const userId = await generateUserId(lastName);

    const memberData = [firstName, lastName, email, mobile, memberType, role];

    const memberInsertSql = 'INSERT INTO MEMBER (F_NAME, L_NAME, EMAIL, MOBILE, MEMBER_TYPE_ID, ROLE_ID) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(memberInsertSql, memberData, async (err, memberResult) => {
      if (err) {
        return res.status(500).json({ error: 'Error while adding member' });
      }

      const memberId = memberResult.insertId;

      // Insert into USER table
      const userData = [memberId, hashedPassword, true, userId];
      const result = await insertUser(userData);

      res.status(201).json({
        message: 'User created successfully',
        id: result.insertId,
        firstName,
        lastName,
        email,
        userId,
      });
    });
  } catch (err) {
    console.error('Error during signup:', err);
    res.status(500).json({ error: 'Internal Server Error. Please try again later.' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    // Check if the user exists
    const existingUser = await checkUserExists(email);
    if (existingUser.length === 0) {
      return res.status(404).json({ error: 'No user found with this email.' });
    }

    const user = existingUser[0];

    const isPasswordCorrect = await bcrypt.compare(password, user.PWD);
    if (!isPasswordCorrect) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const token = jwt.sign(
      { id: user.USER_ID, email: user.EMAIL, role: user.ROLE_ID, fullName: `${user.F_NAME} ${user.L_NAME}`, userId: user.USER_ID },
      JWT_SECRET,
      { expiresIn: '5h' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
    });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ error: 'Internal Server Error. Please try again later.' });
  }
});

module.exports = router;
