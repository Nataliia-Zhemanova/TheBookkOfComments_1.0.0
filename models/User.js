//const { model, Schema} = require('mongoose')
const mongoose = require("mongoose");
mongoose.Schema.Types.String.set('trim', true);

const Schema = mongoose.Schema (
 {
  _id: mongoose.Schema.Types.ObjectId,

  firstName: {
    type: String,
    trim: true,
    required: false
  },

  lastName: {
    type: String,
    trim: true,
    required: false
  },

  comments: [
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    required: false
  },
  ],
})

module.exports = mongoose.model('User', Schema)
