const { model, Schema} = require('mongoose')
const mongoose = require("mongoose");
mongoose.Schema.Types.String.set('trim', true);

const commentSchema =

  new Schema({

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
