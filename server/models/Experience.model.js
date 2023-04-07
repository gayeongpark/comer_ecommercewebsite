const { Schema, model } = require('mongoose');
// const User = require('./User.model');

const experienceSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    // typeOfFood: {
    //   type: String,
    //   required: true,
    // },
    // foodActivity: {
    //   type: String,
    //   required: true,
    // },
    description: {
      type: String,
      required: true,
    },
    runningTime: {
      type: Number,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    criteriaOfGuest: {
      type: String,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    images: { type: [String], required: true },
    likes: { type: [String], required: true },
    perks: { type: [String], required: true },
    notice: {
      type: String,
      require: true,
    },
    meetingTime: {
      type: Number,
      required: true,
    },
    leavingTime: {
      type: Number,
      required: true,
    },
    maxGuest: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Experience = model('Experience', experienceSchema);

module.exports = Experience;
