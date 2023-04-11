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
      type: [String],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    runningTime: {
      type: Number,
      required: true,
    },
    minimumAge: {
      type: Number,
      required: true,
    },
    groupSize: {
      type: Number,
      required: true,
    },
    country: {
      type: String,
    },
    city: {
      type: String,
    },
    criteriaOfGuest: {
      type: String,
      required: true,
    },
    longitude: {
      type: Number,
    },
    latitude: {
      type: Number,
    },
    images: { type: [String], required: true },
    likes: { type: [String], required: true },
    perks: {
      food: {
        name: String,
        description: String,
      },
      beverage: {
        name: String,
        description: String,
      },
      alcohol: {
        name: String,
        description: String,
      },
      equipment: {
        name: String,
        description: String,
      },
      others: {
        name: String,
        description: String,
      },
    },
    notice: {
      type: String,
      require: true,
    },
    startTime: {
      type: Number,
      required: true,
    },
    kidsAllowed: {
      type: Boolean,
    },
    petsAllowed: {
      type: Boolean,
    },
    endTime: {
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
    calcellation1: {
      type: Boolean,
    },
    calcellation2: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const Experience = model('Experience', experienceSchema);

module.exports = Experience;
