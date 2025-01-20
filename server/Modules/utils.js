const db = require('../Config/connection');

const checkUserExists = (email) => {
    return new Promise((resolve, reject) => {
      const checkUserSql = `
        SELECT * 
        FROM USER u 
        JOIN MEMBER m ON u.MEMBER_ID = m.MEMBER_ID 
        WHERE m.EMAIL = ?
      `;
      console.log('Query:', checkUserSql);
      db.query(checkUserSql, [email], (err, data) => {
        if (err) {
          console.error('Database error in checkUserExists:', err);
          return reject(err);
        }
  
        console.log('Query result:', data); 
        resolve(data);
      });
    });
  };
  
  
  

const checkMemberTypeExists = (memberTypeId) => {
  return new Promise((resolve, reject) => {
    const checkMemberTypeSql = `
      SELECT * 
      FROM member_type 
      WHERE MEMBER_TYPE_ID = ?
    `;
    db.query(checkMemberTypeSql, [memberTypeId], (err, data) => {
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

  while ((await checkUserIdExists(userId)).length > 0) {
    uniqueNumber++;
    userId = `${lastName}${String(uniqueNumber).padStart(3, '0')}`;
  }

  return userId;
};

const checkUserIdExists = (userId) => {
  return new Promise((resolve, reject) => {
    const checkUserIdSql = `
      SELECT * 
      FROM USER 
      WHERE USER_ID = ?
    `;
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
    const sql = `
      INSERT INTO USER (MEMBER_ID, PWD, ACTIVE, USER_ID) 
      VALUES (?, ?, ?, ?)
    `;
    db.query(sql, userData, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

module.exports = {
  checkUserExists,
  checkMemberTypeExists,
  generateUserId,
  insertUser,
};
