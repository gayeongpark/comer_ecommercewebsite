const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User.model');
const router = express.Router();

router.post('/signup', async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const hash2 = bcrypt.hashSync(req.body.password2, salt);
    const { email, password, password2 } = req.body;
    if (password !== password2)
      return res.status(400).send('Password does not match');
    const user = await User.findOne({ email });
    if (user) return res.status(400).send('User already registered.');
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
    if (!user) return next(createError(404, 'This user was not registered!'));
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return next(
        createError(403, 'Wrong password or username, please check out!')
      );
    if (isPasswordCorrect) {
      const accessToken = jwt.sign(
        {
          id: user._id,
          email: user.email,
        },
        process.env.ACCESS_SECRET,
        {
          expiresIn: '1h',
          issuer: 'Park29',
        }
      );
      const refreshToken = jwt.sign(
        {
          id: user._id,
          email: user.email,
        },
        process.env.REFRESH_SECRET,
        {
          expiresIn: '24h',
          issuer: 'Park29',
        }
      );
      res.cookie('accessToken', accessToken, {
        secure: false,
        httpOnly: true,
      });

      res.cookie('refreshToken', refreshToken, {
        secure: false,
        httpOnly: true,
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
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    const user = await User.find((item) => item.refreshToken === refreshToken);
    if (!user) {
      jwt.verify(refreshToken, process.env.REFRESH_SECRET, (error, decoded) => {
        if (error || user.email !== decoded.email) {
          return res.status(406).json({ message: 'Unauthorized!' });
        }
        const accessToken = jwt.sign(
          {
            id: decoded._id,
            email: decoded.email,
          },
          process.env.ACCESS_SECRET,
          {
            expiresIn: '1h',
            issuer: 'Park29',
          }
        );
        res.json({ accessToken });
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/logout', async (req, res, next) => {
  try {
    res.clearCookie('refreshToken');
    res.clearCookie('accessToken');
    res.status(200).json('Completely logout');
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
