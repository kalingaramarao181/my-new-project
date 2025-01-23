const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../Config/connection');
const { checkUserExists, checkMemberTypeExists, generateUserId, insertUser } = require('./utils');

const router = express.Router();

router.post('/signup', async (req, res) => {
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
      studentID,      
      volunteerType, 
      subject,       
      about,      
    } = req.body;

    // Validate required fields
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

    // Check if the memberType is valid
    const memberTypeExists = await checkMemberTypeExists(memberType);
    if (memberTypeExists.length === 0) {
      return res.status(400).json({ error: 'Invalid member type provided.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if the email already exists
    const existingUsers = await checkUserExists(email);
    if (existingUsers.length > 0) {
      return res.status(400).json({ error: 'User already exists with this email.' });
    }

    const userId = await generateUserId(lastName);

    // Prepare member data based on the memberType
    let memberData = [
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
      roleId || 4,  // Default role if not provided
    ];

    if (memberType === 5) {  // Volunteer
      // Add volunteer-specific fields
      memberData.push(volunteerType || null);  
      memberData.push(subject || null);        
      memberData.push(about || null);          
      memberData.push(null);  // No studentID for volunteers
    } else if (memberType === 3) {  // Parent
      // Add parent-specific fields
      memberData.push(null);  // No volunteerType, subject, or about for parents
      memberData.push(null);
      memberData.push(null);
      memberData.push(studentID || null);  // Add studentID for parents
    } else {
      // For other member types, just insert null for the extra fields
      memberData.push(null); 
      memberData.push(null);
      memberData.push(null);
      memberData.push(null);  
    }

    // Ensure that there are exactly 15 values in the memberData array
    if (memberData.length !== 15) {
      return res.status(500).json({ error: 'Internal Server Error: Invalid number of data values.' });
    }

    // Insert into MEMBER table
    const memberInsertSql = `
      INSERT INTO MEMBER 
      (F_NAME, L_NAME, EMAIL, MOBILE, ADD1, ADD2, CITY, STATE, ZIP, MEMBER_TYPE_ID, ROLE_ID, VOLUNTEER_TYPE, SUBJECT, ABOUT, STUDENT_ID) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(memberInsertSql, memberData, async (err, memberResult) => {
      if (err) {
        console.error('Database error while inserting member:', err);
        return res.status(500).json({ error: 'Error while adding member' });
      }

      const memberId = memberResult.insertId;

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


module.exports = router;
