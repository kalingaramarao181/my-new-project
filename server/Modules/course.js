const express = require('express');
const mysql = require('mysql2');
const db = require('../Config/connection');

const router = express.Router();

router.get('/courses', (req, res) => {
  
  const query = `
    SELECT *
    FROM course
    WHERE ACTIVE = 1;
  `;

  db.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching courses:', error);
      return res.status(500).json({ error: 'Failed to fetch courses' });
    }
    res.status(200).json(results);
  });
});

router.get('/course/:courseId', (req, res) => {
    const courseId = req.params.courseId;
  
    const query = `
      SELECT *
      FROM course
      WHERE COURSE_ID = ? AND ACTIVE = 1;
    `;
  
    db.query(query, [courseId], (error, results) => {
      if (error) {
        console.error('Error fetching course by ID:', error);
        return res.status(500).json({ error: 'Failed to fetch course' });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ message: `Course with ID ${courseId} not found or inactive` });
      }
  
      res.status(200).json(results[0]);
    });
  });

  router.get('/enrolled-courses/:userId', (req, res) => {
    const userId = req.params.userId;
  
    const query = `
      SELECT ce.ENROLLMENT_ID, ce.MEMBER_ID, ce.COURSE_ID, ce.ENROLLMENT_DATE, ce.STATUS, ce.UPDATED_BY, ce.CREATED_TS, ce.LAST_UPD_TS,
             c.COURSE_NAME, c.START_DT, c.END_DT, c.START_TIME, c.END_TIME, c.TIMEZONE, c.PRICE, c.TEACHER_ID, c.BATCH, c.ACTIVE, c.CREATED_TS AS COURSE_CREATED_TS, c.LAST_UPD_TS AS COURSE_LAST_UPD_TS
      FROM COURSE_ENROLLMENT ce
      JOIN COURSE c ON ce.COURSE_ID = c.COURSE_ID
      WHERE ce.MEMBER_ID = ? AND ce.STATUS = 'ENROLLED' AND c.ACTIVE = 1;  -- You can adjust the filter for the status and ACTIVE flag as per your requirements
    `;
  
    db.query(query, [userId], (error, results) => {
      if (error) {
        console.error('Error fetching enrolled courses:', error);
        return res.status(500).json({ error: 'Failed to fetch enrolled courses' });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ message: `No courses found for user with ID ${userId}` });
      }
  
      res.status(200).json(results); 
    });
  });

module.exports = router;
