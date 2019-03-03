const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controllers/userController');
const companyController = require('./controllers/companyController');
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
app.use('/api/circles', circlesController);

// Error handler
app.use(errorHandler);

// Serve static client resources here if running in production
process.env.NODE_ENV = 'production';
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../client/dist'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'dist', 'index.html'));
  });
}

//Start server
const port = process.env.PORT || 5000;
// 0.0.0.0 also allows remote requests
app.listen(port, '0.0.0.0', () =>
  console.log(`Server started on port ${port}...`)
);
