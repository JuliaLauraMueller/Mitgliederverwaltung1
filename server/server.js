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
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors({ exposedHeaders: 'Set-Authorization' }));
app.use('/api', jwt());

app.use('/api', addUpdatedTokenToHeader);

// Routes
app.use('/api/users', userController);
app.use('/api/companies', companyController);
app.use('/api/companyLocations', companyLocationController);
app.use('/api/circles', circlesController);

// Error handler
app.use(errorHandler);

// Serve static client resources here if running in production
//if (process.env.NODE_ENV === 'production') {
app.use(express.static('../client/build'));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
});
//}

//Start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}...`));
