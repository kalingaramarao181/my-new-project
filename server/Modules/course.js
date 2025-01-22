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

module.exports = router;
