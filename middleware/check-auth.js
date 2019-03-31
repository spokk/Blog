const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports = (req, res, next) => {
  try {
    const bearer = req.headers['authorization'].split(' ')[1];
    const decoded = jwt.verify(bearer, keys.secretOrKey);
    req.token = bearer;
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(404).json({ message: 'Auth failed' });
  }
};
