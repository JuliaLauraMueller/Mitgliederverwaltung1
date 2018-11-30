const jwtDecode = require('jwt-decode');
const userService = require('../services/userService');

module.exports = addUpdatedTokenToHeader;

function addUpdatedTokenToHeader(req, res, next) {
  if (
    !(req.originalUrl == '/api/users/auth' || req.originalUrl == '/api/login')
  ) {
    const decodedToken = jwtDecode(req.get('Authorization'));
    const newToken = userService.generateJwtToken(decodedToken);
    res.append('Set-Authorization', newToken);
  }
  next();
}
