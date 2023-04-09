const express = require('express');
const multer = require('multer');
const { authenticateUser } = require('../middleware/authMiddleware.js');
const User = require('../models/User.model');
const router = express.Router();

//get user
router.get('/:id', authenticateUser, async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    // console.log(user)
    if (user.id !== req.user.id) {
      return res.status(404).json('User not found');
    }
    // console.log(user);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

//update user

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

//3. If a file was uploaded, it will set the profilePicture field in the request body to the path of the uploaded file. The path of the uploaded file will be available in req.file.path.
router.put(
  '/update/:id',
  authenticateUser,

  upload.single('profilePicture'), // Can add this line to handle file uploads
  async (req, res, next) => {
    // console.log('PUT request received');
    // console.log('Request file:', req.file);
    try {
      // If a file was uploaded, set the profilePicture field to the path of the uploaded file
      if (req.file) {
        req.body.profilePicture = req.file.path;
      }
      // console.log(req.file);

      let imageUrl = req.file?.path?.replace(/\\/g, '/');
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            ...req.body,
            profilePicture: imageUrl,
          },
        },
        { new: true }
      );
      // console.log('Updated user:', updatedUser);
      if (!updatedUser) {
        return res.status(404).json('User not found');
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      // console.log('Error:', error);
      next(error);
    }
  }
);

//delete user
router.delete('/delete/:id', authenticateUser, async (req, res, next) => {
  try {
    // console.log('Starting delete request');
    const user = await User.findById(req.params.id);
    // console.log(req.user.id);
    if (user.id !== req.user.id) {
      return res.status(404).json('User not found.');
    }
    await User.findOneAndUpdate(
      { _id: user._id },
      { isActive: false },
      { new: true }
    );
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.status(200).json('We are deleting your account. please hold on...');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
