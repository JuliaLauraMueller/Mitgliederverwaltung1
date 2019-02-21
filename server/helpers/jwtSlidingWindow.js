const jwtDecode = require('jwt-decode');
const userService = require('../services/userService');
const config = require('../config/settings');

module.exports = addUpdatedTokenToHeader;

function addUpdatedTokenToHeader(req, res, next) {
  if (!(req.originalUrl == '/api/users/auth')) {
    const decodedToken = jwtDecode(req.get('Authorization'));

    const newToken = userService.generateJwtToken(decodedToken);
    res.append('Set-Authorization', newToken);
  }
  next();
}
