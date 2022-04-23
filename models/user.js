'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  passwordHashAndSalt: {
    type: String,
    required: true
  },
  picture: {
    type: String,
    default: 'https://cdn.landesa.org/wp-content/uploads/default-user-image.png'
  }
});

const User = mongoose.model('User', schema);

module.exports = User;
