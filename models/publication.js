'use strict';

const mongoose = require('mongoose');

const publicationSchema = new mongoose.Schema(
  {
    // - picture: String. ❌
    message: {
      type: String,
      required: true,
      maxlength: 300,
      trim: true
    },
    creator: {
      type: mongoose.Types.ObjectId,
      required: true,
      // Tell mongoose that this refers to the id
      // of a document in the users collection
      // (the collections that corresponds to the
      // 'User' model).
      ref: 'User'
    },
    picture: {
      type: String
    }
  },
  { timestamps: true }
);

const Publication = mongoose.model('Publication', publicationSchema);

module.exports = Publication;
