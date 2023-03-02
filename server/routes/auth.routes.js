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
      return res.status(400).send('Passwords dont match');
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
    const token = jwt.sign({ id: user._id }, process.env.JWT);
    res
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .status(200)
      .json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
