const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

export default verify = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_SECRET, async (error, decoded) => {
      if (error) {
        return res.status(403).json('Token is not valid!');
      }
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(401).json('You are not authenticated!');
      }
      req.userId = user.id;
      next();
    });
  } else {
    res.status(401).json('You are not authenticated!');
  }
};
