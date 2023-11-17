// utils/jwt.js
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
  };

  const options = {
    expiresIn: '1h',
  };

  return jwt.sign(payload, 'your-secret-key', options);
};

// const verifyToken = (token) => jwt.verify(token, 'your-secret-key');

module.exports = {
  generateToken,
  // verifyToken,
};
