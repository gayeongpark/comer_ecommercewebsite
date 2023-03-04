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
    if (user && isPasswordCorrect) {
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
        //About http & https
        httpOnly: true,
        //This means that the token cannot be accessed from javaScript
      });
      res
        .cookie('refreshToken', refreshToken, {
          //About http & https
          httpOnly: true,
          //It means that the token cannot be accessed from javaScript
        })
        .status(200)
        .send('Login success!');
    }
  } catch (error) {
    next(error);
  }
});

router.get('accesstoken', async (req,res,next) => {
  try{
    const accessToken = req.cookies.accessToken;
    const data = jwt.verify(accessToken, process.env.ACCESS_SECRET);

    const userData = User.filter(item => {
      return item.email === data.email;
    })
    res.status(200).json(userData)
    
  } catch(error) {
    res.status(500).json(error)
  }

})

// app.get("/login/success", loginSuccess);
// app.post("/logout", logout);

module.exports = router;
