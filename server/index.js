// index.js
require('dotenv').config(); 
const cors = require('cors');

const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./Modules/auth'); 

const app = express();

app.use(cors())

app.use(bodyParser.json());

app.use('/api', authRoutes); 

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
