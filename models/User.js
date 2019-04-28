const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: ''
  },
  about: {
    type: String,
    default: ''
  },
  date: {
    type: Date,
    default: Date.now
  },
  role: {
    type: String,
    required: true,
    default: 'user'
  }
});

UserSchema.index({ '$**': 'text' });

module.exports = User = mongoose.model('users', UserSchema);
