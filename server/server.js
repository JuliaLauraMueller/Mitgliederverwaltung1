const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controllers/userController');
const companyController = require('./controllers/companyController');
const companyLocationController = require('./controllers/companyLocationController');
const circlesController = require('./controllers/circleController');
const jwt = require('./helpers/jwt');
const cors = require('cors');
const errorHandler = require('./helpers/errorHandler');
const addUpdatedTokenToHeader = require('./helpers/jwtSlidingWindow');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors({ exposedHeaders: 'Set-Authorization' }));
app.use(jwt());

app.use(addUpdatedTokenToHeader);

// Routes
app.use('/api/users', userController);
app.use('/api/companies', companyController);
app.use('/api/companyLocations', companyLocationController);
app.use('/api/circles', circlesController);

// Error handler
app.use(errorHandler);

//Start server
const port = 5000;
app.listen(port, () => console.log(`Server started on port ${port}...`));
