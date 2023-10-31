const {gql} = require('apollo-server')

module.exports = gql`
type User {
     _id: ID
     firstName: String
     lastName: String
     comments: [Comment]
    }
    
type Comment {
    _id: ID
    user: User
    createdAt: String
    rating: Int
    title: String
    description: String
}

input UserFields {
    userId: ID
    firstName: String
    lastName: String
}

input CommentFields {
    commentId: ID
    rating: Int
    title: String
    description: String
}

type Query {
    usersGetAll(amount: Int): [User]
    userGetById(userId: ID!): User
    commentGetAll(commentId: Int): [Comment]
    commentGetById(commentId: ID!): Comment!
}

type Mutation {
    userCreate(userInput: UserFields): User
    userUpdateById(userInput: UserFields): User
    userDeleteById(userId: ID): Boolean
    commentCreate(commentInput: CommentFields): Comment!
    commentUpdateById(commentInput: CommentFields): Comment!
    commentDeleteById(commentId: ID): Boolean
}
`
