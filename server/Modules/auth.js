const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../Config/connection');
const { checkUserExists } = require('./utils');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const existingUser = await checkUserExists(email);
    if (existingUser.length === 0) {
      return res.status(404).json({ error: 'No user found with this email.' });
    }

    const user = existingUser[0];

    const isPasswordCorrect = await bcrypt.compare(password, user.PWD);
    if (!isPasswordCorrect) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: user.USER_ID,
        email: user.EMAIL,
        role: user.ROLE_ID,
        fullName: `${user.F_NAME} ${user.L_NAME}`,
        userId: user.USER_ID,
      },
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
};

module.exports = login;
