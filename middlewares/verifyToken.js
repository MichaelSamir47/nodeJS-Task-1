// middleware/auth.js
const jwt = require('jsonwebtoken');
const { User } = require('../models/user.js');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  try {
    const decoded = jwt.verify(token, 'your-secret-key')
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = { verifyToken };
