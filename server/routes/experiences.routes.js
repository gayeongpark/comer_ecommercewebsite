const express = require('express');
const moment = require('moment');
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
    const userId = experience.userId;
    const owner = await User.findById(userId);
    if (!owner) {
      return res.status(404).json('User not found');
    }
    res.status(200).json({ experience, owner });
  } catch (error) {
    next(error);
  }
});

//get user's all post
router.get('/profile/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json('User not found');
    }
    const experience = await Experience.find({ userId: user.id });
    if (experience.length === 0) {
      return res.status(404).json('No experiences found for this user');
    }
    res.status(200).json(experience);
  } catch (error) {
    next(error);
  }
});

//get random post
router.get('/', async (req, res, next) => {
  try {
    const experiences = await Experience.aggregate([{ $sample: { size: 20 } }]);
    res.status(200).json(experiences);
  } catch (error) {
    next(error);
  }
});

//create a new post

//1. Defined a storage engine for Multer that specifies where uploaded files should be stored and what name they should be given.

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    // console.log('Destination:', file);
    callback(null, 'public/experienceImages/');
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
  '/createExperience',
  authenticateUser,
  upload.array('files', 5),
  async (req, res, next) => {
    try {
      let imageUrls = [];
      if (req.files && req.files.length > 0) {
        imageUrls = req.files.map((file) => file.path.replace(/\\/g, '/'));
      }
      const { startTime, endTime } = req.body;

      // console.log('start time:', startTime);
      // console.log('end time:', endTime);

      const startMoment = moment(startTime, 'h:mm A');
      const endMoment = moment(endTime, 'h:mm A');

      // console.log('start moment:', startMoment.format());
      // console.log('end moment:', endMoment.format());

      const duration = moment.duration(endMoment.diff(startMoment));

      // console.log('duration:', duration.asMinutes());

      const runningTime = duration.asMinutes();

      // console.log('running time:', runningTime);
      if (runningTime <= 0) {
        res.status(405).json('please check out the start time and end time!');
      }

      const newExperience = new Experience({
        userId: req.user.id,
        files: imageUrls,
        runningTime: runningTime,
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
  '/updateAExperience/:id',
  authenticateUser,
  async (req, res, next) => {
    try {
      console.log('deleting an experience for now');
      const { id } = req.params;
      const experience = await Experience.findById(id);
      // console.log(experience);
      if (!experience) {
        res.status(404).json('The experience cannot be found!');
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
