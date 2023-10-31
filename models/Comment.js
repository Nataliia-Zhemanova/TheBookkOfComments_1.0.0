const { model, Schema} = require('mongoose')
const mongoose = require("mongoose");
mongoose.Schema.Types.String.set('trim', true);

const commentSchema =

  new Schema({
  _id: mongoose.Schema.Types.ObjectId,

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  createdAt: String,

  rating: Number,

  title: String,

  description: String,

});

module.exports = model('Comment', commentSchema)
