const jwt = require('jsonwebtoken');
const { tokenError, autorizationError } = require('../errors/authError');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  if (!token) {
    throw autorizationError;
  } else {
    try {
      payload = jwt.verify(token, '67363027686a0b895f436da9e7621b6355c93a077ef4faf645b81dcb78e5db25');
    } catch (err) {
      next(tokenError);
    }
    req.user = payload;
  }
  next();
};
