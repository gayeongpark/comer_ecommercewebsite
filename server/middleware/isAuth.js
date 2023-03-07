const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

const isAuth = (req) => {
  const authAccessToken = req.cookies['accessToken'];
  if (!authAccessToken) {
    return res.status(401).json('You are not authenticated!');
  }
  jwt.verify(
    authAccessToken,
    process.env.ACCESS_SECRET,
    async (error, decoded) => {
      if (error) {
        return res.status(403).json('Token is not valid!');
      }
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(401).json('You are not authenticated!');
      }
      req.userId = user.id;
      next();
    }
  );
};

module.exports = { isAuth };
