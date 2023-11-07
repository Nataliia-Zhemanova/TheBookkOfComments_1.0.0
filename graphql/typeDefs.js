const {gql} = require('apollo-server')

module.exports = gql`
type User {
     firstName: String
     lastName: String
     comments: [Comment]
    }
    
type Comment {
    user: User
    createdAt: String
    rating: Int
    title: String
    description: String
}

input UserFields {
    firstName: String
    lastName: String
}

input CommentFields {
    rating: Int
    title: String
    description: String
}

type Query {
    usersGetAll(amount: Int): [User]
    userGetById(ID: ID!): User!
    commentGetAll(amount: Int): [Comment]
    commentGetById(ID: ID!): Comment!
}

type Mutation {
    userCreate(userInput: UserFields): User!
    userUpdateById(ID: ID!, userInput: UserFields): User
    userDeleteById(ID: ID!): Boolean
    commentCreate(commentInput: CommentFields): Comment!
    commentUpdateById(ID: ID!, commentInput: CommentFields): Comment!
    commentDeleteById(ID: ID!): Boolean
}
`
