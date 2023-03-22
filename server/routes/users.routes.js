const express = require('express');
const authenticatedUser = require('../middleware/authMiddleware');
const User = require('../models/User.model');
const router = express.Router();

//get user
router.get('/:id', authenticatedUser, async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json('User not found');
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

//update user
router.put('/update/:id', authenticatedUser, async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      console.log('Updated user:', updatedUser);
      if (!updatedUser) {
        return res.status(404).json('User not found');
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  } else {
    return res.status(404).json('You can update only your account!');
  }
});

//delete user
router.delete('/delete/:id', authenticatedUser, async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json('User has been deleted.');
    } catch (error) {
      next(error);
    }
  } else {
    return res.status(404).json('You can delete only your');
  }
});

module.exports = router;
