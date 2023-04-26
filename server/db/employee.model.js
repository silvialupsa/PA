// https://mongoosejs.com/
const mongoose = require("mongoose");

const { Schema } = mongoose;

const EmployeeSchema = new Schema({
  present: {
    type: Boolean,
    default: false,
  },
  name: String,
  level: String,
  // position: String,
  created: {
    type: Date,
    default: Date.now,
  },
  equipment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Equipment'
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand'
  },
  color: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Color'
  },
  // salary: Number,
  readBooks: [{
    name: String,
    author: String
  }],
  yearsOfExperience: Number,
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location'
  },
  position: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Position'
  },
  height: Number
});

module.exports = mongoose.model("Employee", EmployeeSchema);
