const express = require('express');
const Experience = require('../models/Experience.model');
// const User = require('../models/User.model.js');
const authenticatedUser = require('../middleware/authMiddleware');
const multer = require('multer');
const router = express.Router();

//get a post
router.get('/:id/post', async (req, res, next) => {
  try {
    const { id } = req.params;
    const experience = await Experience.findById(id);
    res.status(200).json(experience);
  } catch (error) {
    res.status(500).json('Failed to get a experience');
  }
});

//get timeline posts

//get posts by id

//create a new post

//update posts

//delete a post

//likes post

module.exports = router;
