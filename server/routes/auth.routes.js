const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const { verifyEmail } = require('../middleware/authMiddleware.js');
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
    const token = crypto.randomBytes(32).toString('hex');
    const newUser = new User({
      email: req.body.email,
      password: hash,
      password2: hash2,
      emailToken: token,
      isVerified: false,
    });
    await newUser.save();

    //I can revise that into comers' email acount like this below
    // const transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   host: 'smtp.gmail.com',
    //   port: 587,
    //   secure: false,
    //   auth: {
    //     user: process.env.NODEMAILER_USER,
    //     pass: process.env.NODEMAILER_PASS,
    //   },
    //   tls: {
    //     rejectUnauthorized: false,
    //   },
    // });
    const transporter = nodemailer.createTransport({
      host: '0.0.0.0',
      port: 1025,
    });
    const url = `http://localhost:3000/emailVerification/${token}`;
    await transporter.sendMail({
      from: `"Comer Team" <${process.env.NODEMAILER_USER}>`,
      to: newUser.email,
      subject: 'Important: verify your email to use Comer',
      html: `<h1>Hello user!</h1> <div>Comer received a request to create an account for you.</div> <div>Before we proceed, we need you to verify the email address you provided.</div> <div>Click <a href='${url}'>here</a> to verify your email.</div> <div>Thank you,</div> <div>Comer</div>`,
    });
    res.status(200).json('Welcome to Comer!');
  } catch (error) {
    next(error);
  }
});

//The reason you need to update the emailToken to null is to ensure that the token can only be used once for email verification. Once a user's email has been verified, the emailToken should no longer be valid or usable.
//By setting the emailToken to null, you are essentially deleting the token and preventing any further use of that specific token for email verification.
//This ensures that a user's email can only be verified once, and helps to prevent potential security issues that could arise if an email verification token were to remain valid after a user's email had already been verified.
router.get('/verifyEmail/:token', async (req, res, next) => {
  try {
    const emailToken = req.params.token;
    const user = await User.findOneAndUpdate(
      { emailToken: emailToken },
      { isVerified: true, emailToken: null },
      { new: true }
    );
    console.log(user);
    if (user) {
      res.status(200).json('Your email is verified!');
    } else {
      res.status(404).json('User not found!');
    }
  } catch (error) {
    res.status(500).json('Server Error!');
  }
});

router.post('/login', verifyEmail, async (req, res, next) => {
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
          expiresIn: '7d',
        }
      );

      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        maxAge: 1800000,
      });

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 604800000,
      });
    }
    const resData = {
      email: user.email,
      id: user.id,
      profilePicture: user.profilePicture,
    };
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
    const user = await Reset.findOne({ email });
    if (user) {
      // Email already exists, delete the existing reset to allow for a new one
      await user.deleteOne();
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
    const hash = bcrypt.hashSync(password, salt);
    // Update the user's password
    await User.updateOne(
      { _id: user._id },
      {
        password: hash,
      }
    );
    // Delete the reset token to prevent it from being used again
    await resetPassword.deleteOne();
    res.status(202).json('Password updated successfully!');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
