const bcrypt = require('bcrypt');
const db = require('../Config/connection');
const { checkUserExists, checkMemberTypeExists, generateUserId, insertUser } = require('./utils');

const signup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      mobile,
      address1,
      address2,
      city,
      state,
      zip,
      memberType,
      password,
      roleId,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !mobile ||
      !address1 ||
      !city ||
      !state ||
      !zip ||
      !password ||
      !memberType
    ) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const memberTypeExists = await checkMemberTypeExists(memberType);
    if (memberTypeExists.length === 0) {
      return res.status(400).json({ error: 'Invalid member type provided.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUsers = await checkUserExists(email);
    if (existingUsers.length > 0) {
      return res.status(400).json({ error: 'User already exists with this email.' });
    }

    const userId = await generateUserId(lastName);

    const memberData = [
      firstName,
      lastName,
      email,
      mobile,
      address1,
      address2,
      city,
      state,
      zip,
      memberType,
      roleId || 3, // Default role ID to 3 if not provided
    ];

    const memberInsertSql = `
      INSERT INTO MEMBER 
      (F_NAME, L_NAME, EMAIL, MOBILE, ADD1, ADD2, CITY, STATE, ZIP, MEMBER_TYPE_ID, ROLE_ID) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(memberInsertSql, memberData, async (err, memberResult) => {
      if (err) {
        console.error('Database error while inserting member:', err);
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
};

module.exports = signup;
