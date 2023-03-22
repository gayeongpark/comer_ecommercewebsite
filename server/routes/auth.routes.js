const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const User = require('../models/User.model.js');
const Reset = require('../models/Reset.model.js');
const router = express.Router();

router.post('/signup', async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const hash2 = bcrypt.hashSync(req.body.password2, salt);
    const { email, password, password2 } = req.body;
    if (password !== password2) {
      return res.status(400).json('Password does not match');
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(404).json('User already registered.');
    }
    const newUser = new User({
      email: req.body.email,
      password: hash,
      password2: hash2,
    });
    await newUser.save();
    res.status(200).json('Welcome to Comer!');
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json('This user was not registered!');
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
        httpOnly: true,
        maxAge: 1800000,
      });

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 21600000,
      });
    }
    const resData = {email: user.email, id: user.id};
    // console.log(user)

    res.status(200).json(resData);
  } catch (error) {
    next(error);
  }
});

router.post('/refreshtoken', async (req, res, next) => {
  try {
    const refreshToken = req.cookies['refreshToken'];
    if (!refreshToken) {
      return res.status(401).json('You are not authenticated!');
    }

    const payload = jwt.verify(refreshToken, process.env.REFRESH_SECRET);

    if (!payload) {
      return res.status(401).json('Unauthorized!');
    }

    const accessToken = jwt.sign(
      {
        id: payload._id,
        email: payload.email,
      },
      process.env.ACCESS_SECRET,
      {
        expiresIn: '30m',
      }
    );

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      maxAge: 1800000,
    });
    res.status(202).json('Re-issued accessToken');
  } catch (error) {
    next(error);
  }
});

// router.get('/authenticatedUser', async (req, res, next) => {
//   try {
//     const accessToken = req.cookies['accessToken'];
//     if (!accessToken) {
//       return res.status(401).json('Access token not found!');
//     }
//     const payload = jwt.verify(accessToken, process.env.ACCESS_SECRET);

//     if (!payload) {
//       return res.status(406).json('Unauthorized!');
//     }
//     const user = await User.findOne({ email: payload.email });
//     if (!user) {
//       return res.status(406).json('Unauthorized!');
//     }
//     const { password, password2, ...others } = user._doc;
//     res.status(200).json(others);
//   } catch (error) {
//     next(error);
//   }
// });

router.post('/logout', async (req, res, next) => {
  try {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.status(200).json('Completely logout');
  } catch (error) {
    next(error);
  }
});

router.post('/forgotPassword', async (req, res, next) => {
  try {
    const { email } = req.body;
    const token = crypto.randomBytes(32).toString('hex');
    // res.send(token);
    //This is random string
    const existingReset = await Reset.findOne({ email });
    if (existingReset) {
      // Email already exists, handle the error
      return res.status(400).json('This email has already been reset');
    } else {
      // Email doesn't exist, save the reset
      const newReset = new Reset({
        email,
        token,
      });
      await newReset.save();
      // Send the password reset email
    }
    const transporter = nodemailer.createTransport({
      host: '0.0.0.0',
      port: 1025,
    });
    const url = `http://localhost:3000/resetPassword/${token}`;
    await transporter.sendMail({
      from: 'comernoreply@comer.com',
      to: email,
      subject: 'Ready to reset your password.',
      html: `Click <a href='${url}'>here</a> to reset your password`,
    });
    res.status(200).json('Please check your email!');
  } catch (error) {
    next(error);
  }
});

router.post('/resetPassword', async (req, res, next) => {
  try {
    const { token, password, password2 } = req.body;
    if (password !== password2) {
      return res.status(400).json('Password does not match');
    }
    const resetPassword = await Reset.findOne({ token });
    if (!resetPassword) {
      return res.status(400).json('Invalid link');
    }
    const user = await User.findOne({ email: resetPassword.email });
    if (!user) {
      return res.status(400).json('User not found');
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const hash2 = bcrypt.hashSync(req.body.password2, salt);
    await User.updateOne(
      { _id: user._id },
      {
        password: hash,
        password2: hash2,
      }
    );
    res.status(202).json('Completely update it!');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
