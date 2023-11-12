const {gql} = require('apollo-server')

module.exports = gql`
type User {
     _id: ID!
     firstName: String
     lastName: String
     comments: [Comment]
    }
type Comment {
    _id: ID!
    user: User
    createdAt: String
    rating: Int
    title: String
    description: String
}
input UserFields {
    _id: ID!
    firstName: String
    lastName: String
}
input UserFieldsInComment {
    userId: ID
    firstName: String
    lastName: String
}
input CommentFields {
    commentId: ID
    rating: Int
    title: String
    description: String
    user: ID
}
input CommentUpdateInput {
    _id: ID!
    rating: Int
    title: String
    description: String
}
input UserItems {
    firstName: String
    lastName: String
}
input CommentItems {
    rating: Int
    title: String
    description: String
}
input CommentCreateInput {
    user: UserFieldsInComment
    rating: Int
    title: String
    description: String
}
type Query {
    usersGetAll(amount: Int): [User]
    userGetById(userId: ID!): User!
    commentGetAll(amount: Int): [Comment]
    commentGetById(commentId: ID!): Comment
}
type Mutation {
    userCreate(userInput: UserItems): User
    userUpdateById(userInput: UserFields): User
    userDeleteById(userId: ID!): Boolean
    commentCreate(commentInput: CommentCreateInput): Comment
    commentUpdateById(commentInput: CommentUpdateInput): Comment
    commentDeleteById(commentId: ID!): Boolean
}
`
