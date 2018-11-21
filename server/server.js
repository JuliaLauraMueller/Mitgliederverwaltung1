const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);


// Routes
// e.g. const items = require('./routes/api/items');

const app = express();

// Bodyparser middleware
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to Mongo
mongoose
.connect(db)
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));

// Use routes
// app.use('/api/items', items);

//Start server
const port = 5000;
app.listen(port, () => console.log(`Server started on port ${port}...`));