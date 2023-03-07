const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { isAuth } = require('../middleware/isAuth');

const User = require('../models/User.model');
const router = express.Router();

router.post('/signup', async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const hash2 = bcrypt.hashSync(req.body.password2, salt);
    const { email, password, password2 } = req.body;
    if (password !== password2) {
      return res.status(400).send('Password does not match');
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(404).send('User already registered.');
    }
    const newUser = new User({
      email: req.body.email,
      password: hash, 
      password2: hash2,
    });
    await newUser.save();
    res.status(200).send('New user has been registered!');
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return send(404).json('This user was not registered!');
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(403)
        .json('Wrong password or username, please check out!');
    }

    if (isPasswordCorrect) {
      const accessToken = jwt.sign(
        {
          id: user._id,
          email: user.email,
        },
        process.env.ACCESS_SECRET,
        {
          expiresIn: '30m',
        }
      );
      const refreshToken = jwt.sign(
        {
          id: user._id,
          email: user.email,
        },
        process.env.REFRESH_SECRET,
        {
          expiresIn: '6h',
        }
      );
      res.cookie('accessToken', accessToken, {
        secure: true,
        sameSite: 'none',
        httpOnly: true,
        maxAge: 1800000,
      });

      res.cookie('refreshToken', refreshToken, {
        secure: true,
        sameSite: 'none',
        httpOnly: true,
        maxAge: 21600000,
      });

      res.status(200).json('login success');
    }
  } catch (error) {
    next(error);
  }
});

router.get('/refreshtoken', async (req, res, next) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt)
      return res.status(401).json('You are not authenticated!');
    const refreshToken = cookies.jwt.refreshToken;
    const user = await User.find((item) => item.refreshToken === refreshToken);
    if (user) {
      jwt.verify(refreshToken, process.env.REFRESH_SECRET, (error, decoded) => {
        if (error || user.email !== decoded.email) {
          return res.status(406).json('Unauthorized!');
        }
        const accessToken = jwt.sign(
          {
            id: decoded._id,
            email: decoded.email,
          },
          process.env.ACCESS_SECRET,
          {
            expiresIn: '30m',
          }
        );
        res.cookie('accessToken', accessToken, {
          secure: true,
          sameSite: 'none',
          httpOnly: true,
          maxAge: 1800000,
        });
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post('/logout', isAuth, async (req, res, next) => {
  try {
    res.clearCookie('refreshToken');
    res.clearCookie('accessToken');
    res.status(200).json('Completely logout');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
