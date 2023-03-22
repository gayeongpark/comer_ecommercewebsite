const { Schema, model } = require('mongoose');

const experieceSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    title: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    typeOfFood: {
      type: String,
      required: true,
    },
    foodActivity: {
      type: String,
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
    address: {
      type: String,
      required: true,
    },
    images: { type: [String], required: true },
    perks: { type: [String], required: true },
    extraInfo: {
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
  },
  { timestamps: true }
);

const Experiece = model('Experiece', experieceSchema);

module.exports = Experiece;
