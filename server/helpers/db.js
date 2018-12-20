const config = require('../config/settings');
const mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose
  .connect(config.mongoURI)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

module.exports = {
  User: require('../models/UserModel')
};
