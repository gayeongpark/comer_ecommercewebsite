const express = require('express');
const Experience = require('../models/Experience.model');
const User = require('../models/User.model.js');
const { authenticateUser } = require('../middleware/authMiddleware.js');
const multer = require('multer');
const router = express.Router();

//get a post
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const experience = await Experience.findById(id);
    if (!experience) {
      return res.status(404).json('Experience not found');
    }
    res.status(200).json(experience);
  } catch (error) {
    next(error);
  }
});

//get user's all posts
router.get('/profile/:id', async (req, res, next) => {
  try {
    const { id } = req.params.id;
    const user = await User.findOne({ id });
    console.log(user.id);
    console.log(user._id);
    const experience = await Experience.find({ userId: user.id });
    console.log(experience.userId);
    if (!experience) {
      return res.status(404).json('Experience not found');
    }
    res.status(200).json(experience);
  } catch (error) {
    next(error);
  }
});

//get all post
router.get('/timeline', async (req, res, next) => {
  try {
    const posts = await Experience.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
});

//create a new post

//1. Defined a storage engine for Multer that specifies where uploaded files should be stored and what name they should be given.

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    // console.log('Destination:', file);
    callback(null, 'public/profileImages/');
  },
  filename: (req, file, callback) => {
    // console.log('Filename:', file);
    callback(null, Date.now() + '-' + file.originalname);
  },
});

//2. Created a Multer middleware that uses the storage engine and specifies that only image files should be accepted:
const upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    // console.log(req)
    // console.log('File filter:', file);
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      callback(null, true);
    } else {
      callback(new Error('Only image files are allowed!'));
    }
  },
});

//3. If files were uploaded, it will set the profilePicture field in the request body to the path of the uploaded file. The path of the uploaded file will be available in req.files.path.
router.post(
  ':id/createExperience',
  authenticateUser,
  upload.array('images', 5),
  async (req, res, next) => {
    try {
      let imageUrls = [];
      if (req.files && req.files.length > 0) {
        imageUrls = req.files.map((file) => file.path.replace(/\\/g, '/'));
      }
      const newExperience = new Experience({
        userId: req.user.id,
        images: imageUrls,
        ...req.body,
      });
      const savedExperience = await newExperience.save();
      res.status(200).json(savedExperience);
    } catch (error) {
      next(error);
    }
  }
);

//update a post
router.put(':id/updateExperience', authenticateUser, async (req, res, next) => {
  try {
    console.log('updateing a activity for now');
    const { id } = req.params.id;
    const experience = await Experience.findById(id);
    if (!experience) {
      res.status(404).json('The exeperience cannot be found!');
    }
    if (req.user.id === experience.userId) {
      const updateExperience = await Experience.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updateExperience);
    } else {
      res.status(500).json('You can update only your experience!');
    }
  } catch (error) {
    next(error);
  }
});

//delete a post
router.delete(
  ':id/updateAExperience',
  authenticateUser,
  async (req, res, next) => {
    try {
      console.log('deleting a activity for now');
      const { id } = req.params.id;
      const experience = await Experience.findById(id);
      if (!experience) {
        res.status(404).json('The exeperience cannot be found!');
      }
      if (req.user.id === experience.userId) {
        await Experience.findByIdAndDelete(req.params.id);
        res.status(200).json('The experience has been deleted.');
      } else {
        res.status(500).json('You can delete only your experience!');
      }
    } catch (error) {
      next(error);
    }
  }
);

//likes post
router.put(':id/experience/like', async (req, res, next) => {
  try {
    const { id } = req.params.id;
    const { userId } = req.body;
    const exeperience = await Experience.findById(id);
    if (!exeperience.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json('Post liked');
    } else {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json('Post Unliked');
    }
  } catch (error) {
    next(error);
  }
});

//get posts by tags
router.get('/tags', async (req, res, next) => {
  const tags = req.query.tags.split(',');
  try {
    const exeperience = await Experience.find({ tags: { $in: tags } }).limit(
      20
    );
    res.status(200).json(exeperience);
  } catch (error) {
    next(error);
  }
});

//search
//It must be revised
router.get('/search', async (req, res, next) => {
  try {
    const { city, startDate, endDate } = req.query;
    const experience = await Experience.find({
      city: { $regex: city, $options: 'i' },
      startDate: { $gte: startDate },
      endDate: { $lte: endDate },
    }).limit(40);
    res.status(200).json(experience);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
