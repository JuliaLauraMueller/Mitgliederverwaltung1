const jwtDecode = require('jwt-decode');
const userService = require('../services/userService');
const config = require('../config/settings');

module.exports = addUpdatedTokenToHeader;

function addUpdatedTokenToHeader(req, res, next) {
  if (
    !(req.originalUrl == '/api/users/auth' || req.originalUrl == '/api/login')
  ) {
    const decodedToken = jwtDecode(req.get('Authorization'));
    const currTime = new Date().getTime() / 1000;
    // only send updated token if at least half the expiration duration of the current token has already passed
    if (
      decodedToken &&
      decodedToken.exp - currTime < config.jwtExpirationSeconds / 2
    ) {
      const newToken = userService.generateJwtToken(decodedToken);
      res.append('Set-Authorization', newToken);
    }
  }
  next();
}
