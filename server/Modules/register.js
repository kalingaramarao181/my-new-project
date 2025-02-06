const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../Config/connection');
const { checkUserExists, checkMemberTypeExists, generateUserId, insertUser } = require('./utils');

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const {
      title,
      firstName,
      lastName,
      dob,
      grade,
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
      createdBy, 
    } = req.body;

    // Validate required fields
    if (
      !title ||
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

    const formatedDob = new Date(dob).toISOString().split('T')[0];

    // Check if the memberType is valid
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

    let memberData = [
      firstName,
      lastName,
      title,
      formatedDob,
      grade || null,
      email,
      mobile,
      address1,
      address2,
      city,
      state,
      zip,
      memberType,
      roleId,
    ];

    if (memberType === 5) {
      // Volunteer
      memberData.push(volunteerType || null);
      memberData.push(subject || null);
      memberData.push(about || null);
      memberData.push(null);
    } else if (memberType === 3) {
      // Parent
      memberData.push(null);
      memberData.push(null);
      memberData.push(null);
      memberData.push(studentID || null); // Add studentID for parents
    } else {
      memberData.push(null);
      memberData.push(null);
      memberData.push(null);
      memberData.push(null);
    }
    

    if (memberData.length !== 18) {
      return res.status(500).json({ error: 'Internal Server Error: Invalid number of data values.' });
    }

    const memberInsertSql = `
      INSERT INTO MEMBER 
      (F_NAME, L_NAME, GENDER, DOB, GRADE, EMAIL, MOBILE, ADD1, ADD2, CITY, STATE, ZIP, MEMBER_TYPE_ID, ROLE_ID, VOLUNTEER_TYPE, SUBJECT, ABOUT, STUDENT_ID, CREATED_BY) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(memberInsertSql, [...memberData, createdBy || null], async (err, memberResult) => {
      if (err) {
        console.error('Database error while inserting member:', err);
        return res.status(500).json({ error: 'Error while adding member' });
      }

      const memberId = memberResult.insertId;

      const updatedCreatedBy = createdBy || memberId;

      if (!createdBy) {
        const updateCreatedBySql = `
          UPDATE MEMBER
          SET CREATED_BY = ?
          WHERE MEMBER_ID = ?
        `;
        db.query(updateCreatedBySql, [updatedCreatedBy, memberId], (updateErr) => {
          if (updateErr) {
            console.error('Error while updating CREATED_BY:', updateErr);
            return res.status(500).json({ error: 'Error while updating createdBy field.' });
          }
        });
      }

      const roleAssignSql = `
        INSERT INTO ROLE_ASSIGN (MEMBER_ID, ROLE_ID, UPDATED_BY, CREATED_TS, LAST_UPD_TS) 
        VALUES (?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      `;

      db.query(roleAssignSql, [memberId, roleId, updatedCreatedBy], async (roleErr) => {
        if (roleErr) {
          console.error('Database error while inserting role assignment:', roleErr);
          return res.status(500).json({ error: 'Error while assigning role to the member.' });
        }

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
    });
  } catch (err) {
    console.error('Error during signup:', err);
    res.status(500).json({ error: 'Internal Server Error. Please try again later.' });
  }
});

module.exports = router;
