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
      const createdUser = new User ({
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

    async commentCreate(_, {commentInput: {rating, title, description}}){
      const createdComment =
        new Comment ({
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
        {rating: rating, title: title, description: description})).modifiedCount;
      return wasUpdated;
    },

    async commentDeleteById(_, {ID}){
      const wasDeleted = (await Comment.deleteOne(
        {_id: ID})).deletedCount;
      return wasDeleted;
    },
  }
}
