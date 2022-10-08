const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [book]
  }

  type Book {
    authors
    description
    title
    bookId 
    image
    link
    User {
      username: String
}

  type Query {
    me: User
    users: [User]
    user(username: String!): User
   
  }



  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(author: String!, description: String!, bookId: String!, image: String!, link: String!): Book
    removeBook(bookId: ID!): User
    
  }

  type removeBook {
    _id: ID
      User {
        username: String
 }

 
  type Auth {
    token: ID!
    user: User
  }
`;

module.exports = typeDefs;
