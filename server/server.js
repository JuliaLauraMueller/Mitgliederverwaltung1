const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controllers/userController');
const companyController = require('./controllers/companyController');
const circleController = require('./controllers/circleController');
const eventController = require('./controllers/eventController');
const jwt = require('./helpers/jwt');
const cors = require('cors');
const errorHandler = require('./helpers/errorHandler');
const addUpdatedTokenToHeader = require('./helpers/jwtSlidingWindow');
const path = require('path');
const config = require('./config/settings');
const mongoose = require('mongoose');

const app = express();

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose
  .connect(config.mongoURI)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Middleware
app.use(bodyParser.json());
app.use(cors({ exposedHeaders: 'Set-Authorization' }));
app.use('/api', jwt());

app.use('/api', addUpdatedTokenToHeader);

// Routes
app.use('/api/users', userController);
app.use('/api/companies', companyController);
app.use('/api/circles', circleController);
app.use('/api/events', eventController);

// Error handler
app.use(errorHandler);

// Serve static client resources here if running in production
app.use(express.static('../client/build'));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
});

//Start server
const port = process.env.PORT || 5000;
// 0.0.0.0 also allows remote requests
app.listen(port, '0.0.0.0', () =>
  console.log(`Server started on port ${port}...`)
);
