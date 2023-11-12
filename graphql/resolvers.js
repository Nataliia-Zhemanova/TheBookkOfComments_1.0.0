const { get } = require('lodash');
const User = require('../models/User')
const Comment = require('../models/Comment')
const generateId = require('../utils/generateId')

module.exports = {
  User: {
    comments: async ({comments}) => Comment.find({_id: { $in: comments}})
  },
  Comment: {
    user: async ({user}) => User.findById(user)
  },


  Query: {
    async usersGetAll(_, {amount}) {
      return await User.find().sort({createdAt: -1}).limit(amount)
    },

    async userGetById(_, {userId: id}){
    return await User.findById(id)
    },
    async commentGetAll(_, {amount}) {
      return await Comment.find().sort({createdAt: -1}).limit(amount)
    },
    async commentGetById(_, {commentId: id}){
      return await Comment.findById(id)
    }
  },

  Mutation: {
    async userCreate(_, {
      userInput: {
      firstName,
      lastName,
    }
    }
    ){
      const userId = generateId()
      const user = {
        _id: userId,
        firstName: firstName,
        lastName: lastName,
      }

      const createdUser = new User (user);
      const res = await createdUser.save();
      return {
        ...res._doc
      }
    },

    async userUpdateById(_, {userInput: {userId, firstName, lastName}}){
      const wasUpdated = (await User.updateOne(
        {_id: userId},
        {firstName: firstName, lastName: lastName})).modifiedCount;
      return wasUpdated;
    },

    async userDeleteById(_, {userId: id}){
      const wasDeleted = (await User.deleteOne(
        {_id: id})).deletedCount;
      return wasDeleted;
    },

    async commentCreate(_, {
      commentInput: {
        user: {
          userId,
          firstName,
          lastName
        },
        rating,
        title,
        description
      }
    }
    ){
      const commentId = generateId()
      const newUserId = generateId()

      const newUser = {
        _id: newUserId,
        firstName: firstName,
        lastName: lastName,
      }

      const comment = {
        _id: commentId,
        user: userId ||newUserId,
        createdAt: new Date().toISOString(),
        rating: rating,
        title: title,
        description: description,
      }

      let createdUser = null;
      if(!userId) {
        createdUser = new User(newUser)
        const resUser = await createdUser.save();
        return {
          ...resUser._doc
        }
      } else {
          const update = { $addToSet: { comments: commentId} };
          const resUser = await User.updateOne({_id: userId}, update);
          return  {
            ...resUser._doc
          }
      }

      let createdComment = null;
      createdComment = new Comment (comment);

      const resComm = await createdComment.save();
      return {
        ...resComm._doc
      }
    },
    async commentUpdateById(_, {commentInput: {commentId, rating, title, description}}){
      const wasUpdated = (await Comment.updateOne(
        {_id: commentId},
        {rating: rating, title: title, description: description})).modifiedCount;
      return wasUpdated;
    },

    async commentDeleteById(_, {commentId: id}){
      const wasDeleted = (await Comment.deleteOne(
        {_id: id})).deletedCount;
      return wasDeleted;
    },
  }
}
