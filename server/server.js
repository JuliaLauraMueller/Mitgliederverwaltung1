const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userController = require('./controllers/userController');
const jwt = require('./helpers/jwt');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(jwt());

// Routes
app.use('/api/users', userController);

//Start server
const port = 5000;
app.listen(port, () => console.log(`Server started on port ${port}...`));
