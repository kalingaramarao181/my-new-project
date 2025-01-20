const express = require('express');
const mysql = require('mysql2');
const db = require('../Config/connection'); 

const router = express.Router();

router.get('/user/role-resources/:userId', (req, res) => {
  const userId = req.params.userId;

  db.query(
    `SELECT ROLE_ID 
    FROM ROLE_ASSIGN 
    WHERE MEMBER_ID = ?`, 
    [userId], 
    (error, roleResult) => {
      if (error) {
        console.error("Error fetching role:", error);
        return res.status(500).send("Server Error");
      }

      if (!roleResult || !roleResult.length) {
        return res.status(404).send("No role assigned for this member.");
      }

      const roleId = roleResult[0].ROLE_ID;

      db.query(
        `SELECT r.RESOURCE_NAME 
        FROM ROLE_RESOURCE_MAPPING rr 
        JOIN RESOURCE r ON rr.RESOURCE_ID = r.RESOURCE_ID 
        WHERE rr.ROLE_ID = ?`,
        [roleId],
        (error, resources) => {
          if (error) {
            console.error("Error fetching resources:", error);
            return res.status(500).send("Server Error");
          }

          const resourceNames = resources.map(resource => resource.RESOURCE_NAME);
          res.json(resourceNames);
        }
      );
    }
  );
});

module.exports = router;
