const { verifyToken } = require('../utils/tokenUtils');

const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ error: 'Unauthorized' });
  }
};

module.exports = authenticate;