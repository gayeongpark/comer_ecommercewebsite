const express = require('express');
const Experience = require('../models/Experience.model');
const Comment = require('../models/Comment.model');
const authenticatedUser = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/:experienceId', async (req, res, next) => {
  try {
    const comments = await Comment.find({
      experienceId: req.params.experienceId,
    });
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
});

router.post('/', authenticatedUser, async (req, res, next) => {
  try {
    const newComment = Comment.create({ ...req.body, userId: req.user.id });
    res.status(200).send(newComment);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', authenticatedUser, async (req, res, next) => {
  try {
    const comment = await Comment.findById(res.params.id);
    const exeperience = await Experience.findById(res.params.id);
    if (req.user.id === comment.userId || req.user.id === exeperience.userId) {
      await Comment.findByIdAndDelete(req.params.id);
      res.status(200).json('The comment has been deleted.');
    } else {
      res.status(403).json('You can delete ony your comment!');
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
