const express = require('express');
const db = require('../Config/connection');

const router = express.Router();

router.get('/user/role-resources/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
      const [roleResult] = await db.query(`
        SELECT ROLE_ID 
        FROM ROLE_ASSIGN 
        WHERE MEMBER_ID = ?`, [userId]);
  
      if (!roleResult || !roleResult.length) {
        return res.status(404).send("No role assigned for this member.");
      }
  
      const roleId = roleResult[0].ROLE_ID;
      
  
      const [resources] = await db.query(`
        SELECT r.RESOURCE_NAME 
        FROM ROLE_RESOURCE_MAPPING rr 
        JOIN RESOURCE r ON rr.RESOURCE_ID = r.RESOURCE_ID 
        WHERE rr.ROLE_ID = ?`, [roleId]);
  
      const resourceNames = resources.map(resource => {
            return resource.RESOURCE_NAME
        }
        );
      console.log(resources);

      res.json(resourceNames);  
  
    } catch (error) {
      console.error("Error fetching role resources:", error);
      res.status(500).send("Server Error");
    }
  });

module.exports = router;
