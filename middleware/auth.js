const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Exporting a middleware function that has the request and response object available to it
module.exports = function (req, res, next) {
  // Get token from header
  const token = req.cookies['access-token'];

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const secret = dotenv.config().parsed.JWT_SECRET;
    const decoded = jwt.verify(token, secret);

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
}