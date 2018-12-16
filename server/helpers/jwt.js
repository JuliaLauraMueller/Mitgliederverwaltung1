const expressJwt = require('express-jwt');
const config = require('../config/settings');
const userService = require('../services/userService');

module.exports = jwt;

function jwt() {
  const secret = config.jwtSecret;
  return expressJwt({ secret, isRevoked }).unless({
    path: [
      // public routes that don't require authentication
      '/api/users/auth',
      '/api/login'
    ]
  });
}

async function isRevoked(req, payload, done) {
  const user = await userService.getById(payload._id);

  // revoke token if user no longer exists
  if (!user) {
    return done(null, true);
  }

  done();
}
