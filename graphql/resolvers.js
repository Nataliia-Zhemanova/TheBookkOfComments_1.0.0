const User = require('../models/User')
const Comment = require('../models/Comment')
const generateId = require('../utils/generateId')

module.exports = {

  Query: {
    async usersGetAll(_, {amount}) {
      return await User.find().sort({createdAt: -1}).limit(amount)
    },
    async userGetById(_, {ID}){
      return await User.findById(ID)
    },
    async commentGetAll(_, {amount}) {
      return await Comment.find().sort({createdAt: -1}).limit(amount)
    },
    async commentGetById(_, {ID}){
      return await Comment.findById(ID)
    }
  },

  Mutation: {

    async userCreate(_, {userInput: {firstName, lastName}}){
      const userId = generateId()
      const createdUser = new User ({
        _id: userId,
        firstName: firstName,
        lastName: lastName,
      });

      const res = await createdUser.save();

      return {
        id: res.id,
        ...res._doc
      }
    },

    async userUpdateById(_, {ID, userInput: {firstName, lastName}}){
      const wasUpdated = (await User.updateOne(
        {_id: ID},
        {firstName: firstName, lastName: lastName})).modifiedCount;
      return wasUpdated;
    },

    async userDeleteById(_, {ID}){
      const wasDeleted = (await User.deleteOne(
        {_id: ID})).deletedCount;
      return wasDeleted;
    },

    async commentCreate(_, {ID, commentInput: {rating, title, description}}){
      const commentId = generateId();
      const createdComment =
        new Comment ({
          _id: commentId,
          user: ID,
          createdAt: new Date().toISOString(),
          rating: rating,
          title: title,
          description: description,
      });

      const res = await createdComment.save();
      return {
        id: res.id,
        ...res._doc
      }
    },
    async commentUpdateById(_, {ID, commentInput: {rating, title, description}}){
      const wasUpdated = (await Comment.updateOne(
        {_id: ID},
        {firstName: firstName, lastName: lastName})).modifiedCount;
      return wasUpdated;
    },

    async commentDeleteById(_, {ID}){
      const wasDeleted = (await Comment.deleteOne(
        {_id: ID})).deletedCount;
      return wasDeleted;
    },
  }
}
