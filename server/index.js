// index.js
require('dotenv').config(); 
const cors = require('cors');

const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./Modules/auth');
const registerRouters = require('./Modules/register') 
const resourceRouters = require('./Modules/resource')
const userRouters = require('./Modules/users')
const courseRouters = require('./Modules/course')
const paymentRouters = require('./Modules/payment')

const app = express();

app.use(cors())

app.use(bodyParser.json());

app.use('/api', authRoutes); 
app.use('/api', registerRouters); 
app.use('/api', resourceRouters); 
app.use('/api', userRouters);
app.use('/api', courseRouters);
app.use('/api', paymentRouters);


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
