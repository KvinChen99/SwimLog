const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PracticeSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    isRequired: true
  },
  month: {
    type: Number,
    isRequired: true
  },
  day: {
    type: Number,
    isRequired: true
  },
  hour: {
    type: Number,
    isRequired: true
  },
  minute: {
    type: Number,
    isRequired: true
  },
  distance: {
    type: Number,
    required: true
  },
  time: {
    type: Number,
    required: true
  },
  rating: Number
});

module.exports = Practice = mongoose.model("practices", PracticeSchema);
