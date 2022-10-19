const jwt = require('jsonwebtoken');
require('dotenv').config();

const { TOKEN_KEY } = process.env;

const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.status(403).json({
      status: false,
      message: 'Undefined Authentication',
    });
  }
  try {
    const decoded = jwt.verify(token, TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).json({
      status: false,
      message: 'Invalid Authentication',
    });
  }
  return next();
};

module.exports = verifyToken;
